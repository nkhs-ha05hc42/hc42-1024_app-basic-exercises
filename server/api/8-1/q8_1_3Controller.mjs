const put813 = (req, res) => {
    console.log(req.body)
    res.send(JSON.stringify({ 
        status: "OK",
        postcode: req.body.postcode   
        })
    )
}

export const q8_1_3Controller = {
    put813,
  }