import { query } from "../../db/manager.mjs"

const selectAll = async () => {
    const results = await query(`
    SELECT
    *
    FROM
    exams;
    `)
    return results.rows
    }
    const selectOne = async (id) => {
    const selectQuery = `
    SELECT
    *
    FROM
    exams
    WHERE
    id = $1;
    `
    const results = await query(selectQuery, [id])
    return results.rows.at(0)
    }

    const insertAll = async (user_id, year, month, day, name, score) => {
        const sql = `
          INSERT INTO exams (user_id, year, month, day, name, score)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;
        `;
        const values = [user_id, year, month, day, name, score];
        const result = await query(sql, values);
        return result.rows[0];
      }   
      
      const updateOne = async (id, user_id, year, month, day, name, score) => {
        const sql = `
          UPDATE exams
          SET user_id = $2, year = $3, month = $4, day = $5, name = $6, score = $7
          WHERE id = $1
          RETURNING *;
        `;
        const values = [id, user_id, year, month, day, name, score];
        const result = await query(sql, values);
        return result.rows[0]; // 更新されたデータを返す
      }
      
      const deleteOne = async (id) => {
        const sql = `
          DELETE FROM exams
          WHERE id = $1
          RETURNING *;
        `;
        const result = await query(sql, [id]);
        return result.rows[0]; // 削除したデータを返す
      }      

    export const q9_7Model = {
        selectAll,
        selectOne,
        insertAll,
        updateOne,
        deleteOne
    }