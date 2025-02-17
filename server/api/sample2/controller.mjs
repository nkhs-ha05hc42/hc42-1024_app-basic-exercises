import { sample2Model } from "./model.mjs"

const postSample2 = async (req, res) => {
  const name = req.body.name
  const age = req.body.age
  if (!name || !age) {
    return res.send(JSON.stringify({ status: "error" }))
  }
  const result = await sample2Model.insertOne(name, age)
  res.send(JSON.stringify({ status: "success", data: result }))
}

const getOneSample2 = async (req, res) => {
    const id = req.params.id
    if (!id) {
    return res.send(JSON.stringify({ status: "error" }))
    }
    const result = await sample2Model.selectOne(id)
    if (!result) {
    return res.send(JSON.stringify({ status: "not found" }))
    }
    res.send(JSON.stringify({ status: "success", data: result }))
   }

   const getAllSample2 = async (req, res) => {
    const result = await sample2Model.selectAll()
    res.send(JSON.stringify({ status: "success", list: result }))
   }

   const putSample2 = async (req, res) => {
    const id = req.params.id
    const postcode = req.body.postcode
    const address = req.body.address
    if (!postcode || !address) {
    return res.send(JSON.stringify({ status: "error" }))
    }
    const result = await sample2Model.updateOne(id, postcode, address)
    if (!result) {
    return res.send(JSON.stringify({ status: "not found" }))
    }
    res.send(JSON.stringify({ status: "success", data: result }))
   }

   const deleteSample2 = async (req, res) => {
    const id = req.params.id
    if (!id) {
    return res.send(JSON.stringify({ status: "error" }))
    }
    const result = await sample2Model.deleteOne(id)
    if (!result) {
    return res.send(JSON.stringify({ status: "not found" }))
    }
    res.send(JSON.stringify({ status: "success", data: result }))
   }
   
   

   export const sample2Controller = {
    postSample2,
    getOneSample2,
    getAllSample2,
    putSample2,
    deleteSample2,
   }