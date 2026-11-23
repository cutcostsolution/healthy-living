// TiDB Database Connection
// This connects to your TiDB Cloud database

import mysql from 'mysql2/promise'

let connection = null

export async function getConnection() {
  if (connection) return connection

  connection = await mysql.createConnection({
    host: process.env.TIDB_HOST,
    port: parseInt(process.env.TIDB_PORT || '4000'),
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE,
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  })

  return connection
}

// Initialize tables if they don't exist
export async function initDB() {
  const db = await getConnection()

  await db.execute(`
    CREATE TABLE IF NOT EXISTS access_codes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      code VARCHAR(20) UNIQUE NOT NULL,
      package_type VARCHAR(20) NOT NULL,
      is_used BOOLEAN DEFAULT FALSE,
      used_by VARCHAR(255),
      used_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      package_type VARCHAR(20) NOT NULL,
      form_data JSON,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  return db
}
