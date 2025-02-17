const deleteRecord = async (id) => {
    const fetchResult = await fetch(`http://localhost:3000/api/9-7/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const responsce = await fetchResult.json()
    if (responsce.status !== "success") {
      throw new Error(responsce.status)
    }
    alert("削除が完了しました！")
   }
  
  const getTargetId = () => {
    const inputFormElement = document.getElementById("target-id-form").elements
    const id = parseInt(inputFormElement.id.value)
    if (!id) {
      throw new Error("IDが入力されていません")
    }
    return id
   }
  
  const clearFormData = () => {
    const inputFormElement = document.getElementById("target-id-form").elements
    inputFormElement.id.value = ""
  }
  
  /**
   * ウィンドウ読み込み時の処理
  */
  window.onload = () => {
    const deleteButtonElement = document.getElementById("delete-button")
    deleteButtonElement.addEventListener(
      "click",
      async () => {
        try {
          const targetId = getTargetId()
          await deleteRecord(targetId)
          clearFormData()
        } catch (err) {
          alert(err)
        }
      },
      false,
    )
  }