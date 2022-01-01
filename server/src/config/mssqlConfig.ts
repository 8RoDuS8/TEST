import { config as MSSQLConfig } from 'mssql'

const mssqlConfig: MSSQLConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: "communication-ltd.database.windows.net",
    database: "CommunicationLTD",
    port: 1433,
    options: {
        encrypt: true,
        connectTimeout: 30,
        trustServerCertificate: false
    }
}

export default mssqlConfig;
