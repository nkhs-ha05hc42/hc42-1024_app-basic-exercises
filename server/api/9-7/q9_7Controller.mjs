import { q9_7Model } from "./q9_7Model.mjs"

const getOne971 = async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.send(JSON.stringify({ status: "error" }))
    }
    const result = await q9_7Model.selectOne(id)
    if (!result) {
        return res.send(JSON.stringify({ status: "not found" }))
    }
    res.send(JSON.stringify({ status: "success", data: result }))
}
  
const getAll971 = async (req, res) => {
    const result = await q9_7Model.selectAll()
    res.send(JSON.stringify({ status: "success", list: result }))
    }

    const post973 = async (req, res) => {
        const { user_id, year, month, day, name, score } = req.body;
      
        // 入力バリデーション
        if (!user_id || !year || !month || !day || !name || score === undefined) {
          return res.status(400).json({ status: "error", message: "全ての項目が必要です。" });
        }
      
        try {
          const newExam = await q9_7Model.insertAll(user_id, year, month, day, name, score);
          res.status(201).json({ status: "success", data: newExam });
        } catch (error) {
          console.error("DBエラー:", error);
          res.status(500).json({ status: "error", message: "データベースエラーが発生しました。" });
        }
      }

      const put974 = async (req, res) => {
        const { id } = req.params;  // URLからIDを取得
        const { user_id, year, month, day, name, score } = req.body;  // リクエストボディからデータ取得
      
        // バリデーション（全ての項目が必須）
        if (!user_id || !year || !month || !day || !name || score === undefined) {
          return res.status(400).json({ status: "error", message: "全ての項目が必要です。" });
        }
      
        try {
          const updatedExam = await q9_7Model.updateOne(id, user_id, year, month, day, name, score);
      
          if (!updatedExam) {
            return res.status(404).json({ status: "not found", message: "指定したIDのデータが存在しません。" });
          }
      
          res.json({ status: "success", data: updatedExam });
        } catch (error) {
          console.error("DBエラー:", error);
          res.status(500).json({ status: "error", message: "データベースエラーが発生しました。" });
        }
      }

      const delete975 = async (req, res) => {
        const { id } = req.params; // URLからIDを取得
      
        try {
          const deletedExam = await q9_7Model.deleteOne(id);
      
          if (!deletedExam) {
            return res.status(404).json({ status: "not found", message: "指定したIDのデータが存在しません。" });
          }
      
          res.json({ status: "success", data: deletedExam });
        } catch (error) {
          console.error("DBエラー:", error);
          res.status(500).json({ status: "error", message: "データベースエラーが発生しました。" });
        }
      }      

export const q9_7Controller = {
    getAll971,
    getOne971,
    post973,
    put974,
    delete975,
}