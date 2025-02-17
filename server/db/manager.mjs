import pg from "pg"

const { Pool } = pg

const pool = new Pool({
  host: "nkhs-node-ex-postgres.app-network.nkhs",
  user: "nkhs_pg_user",
  password: "nkhs_pg_pass",
  database: "nkhs_pg_user",
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const query = (text, params) => pool.query(text, params)

export const getClient = async () => await pool.connect()

// RestApi側では接続が切れるので使用しない
export const end = () => pool.end()
