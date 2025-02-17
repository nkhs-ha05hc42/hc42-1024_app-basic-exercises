import { getClient, end } from "./db/manager.mjs"

/*
 トランザクションを用いたSQLの実行例
*/

const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

const user = {
  name: "登別平均",
  age: 20,
}
const subjects = ["国語", "数学", "社会", "理科", "英語", "情報"]

const client = await getClient()
try {
  await client.query("BEGIN")
  const selectUserResult = await client.query(`
    SELECT
      id
    FROM
      users
    WHERE
      name = '${user.name}'
  `)

  let targetUserId
  if (selectUserResult.rowCount === 0) {
    const insertUserResult = await client.query(`
      INSERT INTO users(
        name,
        age,
        is_disabled
      )
      VALUES(
        '${user.name}',
        ${user.age},
        true
      )
      RETURNING id;
    `)
    targetUserId = insertUserResult.rows.at(0).id
  } else {
    targetUserId = selectUserResult.rows.at(0).id
  }
  await client.query(`
    INSERT INTO exams(
      user_id,
      year,
      month,
      day,
      name,
      score
    )
    VALUES(
      ${targetUserId},
      ${getRandomInt(2010, 2025)},
      ${getRandomInt(1, 12)},
      ${getRandomInt(1, 28)},
      '${subjects.at(getRandomInt(0, subjects.length - 1))}',
      ${getRandomInt(400, 1000) / 10}
    );
  `)

  const selectExamResult = await client.query(`
    SELECT
      COALESCE(AVG(score), 0) AS "averageScore"
    FROM
      exams
    WHERE
      user_id = ${targetUserId}
  `)
  const { averageScore } = selectExamResult.rows.at(0)

  // ユーザーの平均点を更新
  await client.query(`
    UPDATE
      users
    SET
      average_score = ${averageScore}
    WHERE
      id = ${targetUserId};
  `)

  // 処理結果を取得
  const [afterUser, afterExams] = await Promise.all([
    client.query(`
      SELECT
        *
      FROM
        users
      WHERE
        id = ${targetUserId};
    `),
    client.query(`
      SELECT
        *
      FROM
        exams
      WHERE
        user_id = ${targetUserId};
    `),
  ])
  console.log("user", afterUser.rows.at(0))
  console.log(
    "exams",
    afterExams.rows.map((row) => JSON.stringify(row)),
  )

  await client.query("COMMIT")
} catch (err) {
  console.error(err)
  await client.query("ROLLBACK")
} finally {
  client.release()
}

end()
