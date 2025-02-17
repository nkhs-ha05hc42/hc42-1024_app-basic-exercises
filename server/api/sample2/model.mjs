import { query } from "../../db/manager.mjs"

const insertOne = async (name, age) => {
 const insertQuery = `
    INSERT INTO users(
     name,
     age,
     is_disabled
   )
   VALUES(
    $1,
    $2,
    true
   )
   RETURNING *;
 `
 const result = await query(insertQuery, [name, age])
 return result.rows.at(0)
}


const selectAll = async () => {
    const results = await query(`
    SELECT
    *
    FROM
    users;
    `)
    return results.rows
   }
   const selectOne = async (id) => {
    const selectQuery = `
    SELECT
    *
    FROM
    users
    WHERE
    id = $1;
    `
    const results = await query(selectQuery, [id])
    return results.rows.at(0)
   }
   
   const updateOne = async (id, postcode, address) => {
    const updateQuery = `
    UPDATE
    users
    SET
    postcode = $2,
    address = $3
    WHERE
    id = $1
    RETURNING *;
    `
    const result = await query(updateQuery, [id, postcode, address])
    return result.rows.at(0)
   }

   const deleteOne = async (id) => {
    const deleteQuery = `
    DELETE FROM
    users
    WHERE
    id = $1
    RETURNING *;
    `
    const result = await query(deleteQuery, [id])
    return result.rows.at(0)
   }

   
export const sample2Model = {
    insertOne,
    selectOne,
    selectAll,
    updateOne,
    deleteOne,
   }