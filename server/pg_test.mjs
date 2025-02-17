import { query, end } from "./db/manager.mjs"

/*
 PostgreSQLの疎通確認と動作確認用 
*/

const insertResult = await query(`
INSERT INTO users(
  name,
  age,
  is_disabled
)
VALUES(
  '登別次郎',
  31,
  true
)
RETURNING id;
`)
const insertId = insertResult.rows.at(0).id

const select1 = await query(`
SELECT
  *
FROM
  users
WHERE
  id = ${insertId};
`)
console.log("insert after", select1.rows.at(0))

const update = await query(`
UPDATE
  users
SET
  postcode = '0590464'
WHERE
  id = ${insertId};
`)
console.log("update count", update.rowCount)

const select2 = await query(`
SELECT
  *
FROM
  users
WHERE
  id = ${insertId};`)
console.log("update after", select2.rows.at(0))

const deleteResult = await query(`
  DELETE FROM
    users
  WHERE
    id = ${insertId};`)
console.log("delete count", deleteResult.rowCount)

const select3 = await query(`
      SELECT
        *
      FROM
        users
      WHERE
        id = ${insertId};`)
console.log("delete after", select3.rows.at(0))

end()
