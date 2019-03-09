import mysql, { Pool } from 'mysql';
import settings from './../config/settings';

let connection: Pool = null;

export function getConnection(): Pool {
    if (!connection) {
        connection = mysql.createPool({
            connectionLimit: settings.database.connectionLimit,
            host: settings.database.host,
            user: settings.database.user,
            password: settings.database.password,
            database: settings.database.name,
        });
    }

    return connection;
}
