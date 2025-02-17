const getRecord = async (targetId) => {
    const fetchResult = await fetch(
      `http://localhost:3000/api/9-7/${targetId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await fetchResult.json();
    if (response.status !== "success") {
      throw new Error(response.status);
    }
    return response.data;
  };
  
  const updateRecord = async (id, inputBody) => {
    const fetchResult = await fetch(`http://localhost:3000/api/9-7/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputBody),
    });
    const response = await fetchResult.json();
    if (response.status !== "success") {
      throw new Error(response.status);
    }
    alert("更新が完了しました！");
  };

const getTargetId = () => {
  const inputFormElement = document.getElementById("target-id-form").elements
  const id = parseInt(inputFormElement.id.value)
    if (!id) {
    throw new Error("IDが入力されていません")
    }
    return id
}

const setFormData = (record) => {
  const inputFormElement = document.getElementById("input-form").elements
  inputFormElement.id.value = record.id
  inputFormElement.userid.value = record.user_id
  inputFormElement.year.value = record.year
  inputFormElement.month.value = record.month
  inputFormElement.day.value = record.day
  inputFormElement.name.value = record.name
  inputFormElement.score.value = record.score
}

const getFormData = () => {
  const inputFormElement = document.getElementById("input-form").elements
  const id = inputFormElement.id.value
  const user_id = parseInt(inputFormElement.userid.value)
  const year = parseInt(inputFormElement.year.value)
  const month = parseInt(inputFormElement.month.value)
  const day = parseInt(inputFormElement.day.value)
  const name = inputFormElement.name.value
  const score = parseInt(inputFormElement.score.value)
  
  if (!id) {
    throw new Error("対象が読み込まれていません")
  }
  return {
    id,
    intutBody: {
        user_id,
        year,
        month,
        day,
        name,
        score,
    },
  }
}

const clearFormData = () => {
  const inputFormElement = document.getElementById("input-form").elements
  inputFormElement.userid.value = "";
  inputFormElement.year.value = "";
  inputFormElement.month.value = "";
  inputFormElement.day.value = "";
  inputFormElement.name.value = "";
  inputFormElement.score.value = "";
}

/**
 * ウィンドウ読み込み時の処理
*/
window.onload = () => {
  const oneRecordLoadButtonElement = document.getElementById(
    "one-record-load-button",
  )
  oneRecordLoadButtonElement.addEventListener(
    "click",
    async () => {
      try {
        const targetId = getTargetId()
        const targetRecord = await getRecord(targetId)
        setFormData(targetRecord)
    } catch (err) {
      alert(err)
    }
   },
   false,
  )
  const updateButtonElement = document.getElementById("update-button")
  updateButtonElement.addEventListener(
    "click",
    async () => {
    try {
      const { id, intutBody } = getFormData()
      await updateRecord(id, intutBody)
      clearFormData()
    } catch (err) {
      alert(err)
    }
   },
   false,
  )
}