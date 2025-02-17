const viewRecords = [
    {
        id: 1,
        name: "太郎",
        age: 19,
    },
    {
        id: 2,
        name: "花子",
        age: 22,
    },
    {
        id: 3,
        name: "次郎",
        age: 18,
    },
    ]

/**
* ウィンドウ読み込み時の処理
*/
window.onload = () => {
    const sample3Body = document.getElementById("sample3-body")
    sample3Body.innerHTML = ""
    for (const record of viewRecords) {
        const tr = document.createElement("tr")
    sample3Body.appendChild(tr)
    
    const idTd = document.createElement("td")
    idTd.appendChild(document.createTextNode(record.id))
    tr.appendChild(idTd)

    const nameTd = document.createElement("td")
    nameTd.appendChild(document.createTextNode(record.name))
    tr.appendChild(nameTd)
    
    const ageTd = document.createElement("td")
    ageTd.appendChild(document.createTextNode(record.age))
    tr.appendChild(ageTd)
    }
    }