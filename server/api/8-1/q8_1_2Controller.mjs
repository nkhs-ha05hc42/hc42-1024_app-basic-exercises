const post812 = (req, res) => {
    console.log(req.body)
    res.send(JSON.stringify({
         status: "OK" ,
         postcode: req.body.postcode
        })
    )
}

export const q8_1_2Controller = {
    post812,
  }