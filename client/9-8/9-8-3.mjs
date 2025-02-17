const createRecord = async (inputBody) => {
    const fetchResult = await fetch("http://localhost:3000/api/9-7", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputBody),
    });
  
    const responsce = await fetchResult.json();
    
    if (responsce.status !== "success") {
      throw new Error(responsce.status)
    }
    alert("登録が完了しました！")
  }
  
  const getFormData = () => {
    const inputFormElement = document.getElementById("input-form");
    const id = inputFormElement.id.value
    const user_id = inputFormElement.userid.value
    const year = parseInt(inputFormElement.year.value)
    const month = parseInt(inputFormElement.month.value)
    const day = parseInt(inputFormElement.day.value)
    const name = inputFormElement.name.value
    const score = parseInt(inputFormElement.score.value)
    if (!id) {
      throw new Error("IDは必須です");
    }
    if (!user_id) {
      throw new Error("UserIDは必須です");
    }
    if (!year || !month || !day) {
      throw new Error("日付はすべて入力してください");
    }
    if (!name) {
      throw new Error("名前は必須です");
    }
    if (!score) {
      throw new Error("スコアは必須です");
    }
  
    return {
      id,
      user_id,
      year,
      month,
      day,
      name,
      score
    }
  }
  
  const clearFormData = () => {
    const inputFormElement = document.getElementById("input-form").elements
    inputFormElement.id.value = ""
    inputFormElement.userid.value = ""
    inputFormElement.year.value = ""
    inputFormElement.month.value = ""
    inputFormElement.day.value = ""
    inputFormElement.name.value = ""
    inputFormElement.score.value = ""
  }
  /**
  * ウィンドウ読み込み時の処理
  */
  window.onload = () => {
    const createButtonElement = document.getElementById("create-button")
    createButtonElement.addEventListener(
      "click",
      async () => {
        try {
          const intutBody = getFormData()
          await createRecord(intutBody)
          clearFormData()
        } catch (err) {
          alert(err)
        }
      },
      false,
    )
  }