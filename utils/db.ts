import mysql, { RowDataPacket } from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

export async function query<T>(sql: string, values?: any []): Promise<T> {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results as T;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}