import appConfig from "@app/config/appConfig";
import { ClientData, DBClientData } from "@app/types/interfaces";
import mssql, { Request } from "mssql";

const connect = async () => mssql.connect(appConfig.mssqlConfig);

type StoredProcedureInput = Parameters<Request["input"]>;
type StoredProcedureOutput = Parameters<Request["output"]>;

type DBResult<T> = {
    success: boolean;
    data?: T;
} ;


async function storedProcedure(procedure: string, inputs: StoredProcedureInput[], outputs?: StoredProcedureOutput[]) {

    const connection = await connect();

    const request = new Request(connection);
    inputs.forEach(input => request.input(...input));
    if (outputs) outputs.forEach(output => request.output(...output));


    try {
        return await request.execute(procedure);
    } finally {
        connection.close();
    }
}

async function registerUser(email: string, username: string, hashedPassword: string):
    Promise<DBResult<number>> {
    const inputs: StoredProcedureInput[] = [
        ["username", mssql.NVarChar(50), username],
        ["password", mssql.NVarChar(100), hashedPassword],
        ["email", mssql.NVarChar(50), email]
    ];
    const outputs: StoredProcedureOutput[] = [
        ["id", mssql.Int]
    ];
    const result = await storedProcedure("RegisterUser", inputs, outputs);
    return {
        data: result.output.id,
        success: !!result.returnValue
    }
}

interface PasswordResult {
    Password: string;
}

async function getPassword(username: string):
    Promise<DBResult<PasswordResult[]>> {
    const inputs: StoredProcedureInput[] = [
        ["username", mssql.NVarChar(50), username],
    ]
    const result = await storedProcedure("GetPassword", inputs);
    return {
        success: !!result.returnValue,
        data: result.recordset
    };
}

async function updatePassword(username: string, password: string):
    Promise<DBResult<undefined>> {

    const inputs: StoredProcedureInput[] = [
        ["username", mssql.NVarChar(50), username],
        ["password", mssql.NVarChar(100), password],
    ];
    const result = await storedProcedure("ChangePassword", inputs);
    return { success: !!result.returnValue, data: undefined }
}

async function registerClient(username: string, data: ClientData):
    Promise<DBResult<number>> {

    const { fullname, address, dob, email, phoneNumber } = data;
    const inputs: StoredProcedureInput[] = [
        ["username", mssql.NVarChar(50), username],
        ["fullname", mssql.NVarChar(50), fullname],
        ["dateofbirth", mssql.Date(), dob],
        ["email", mssql.NVarChar(50), email],
        ["phonenumber", mssql.NVarChar(50), phoneNumber],
        ["address", mssql.NVarChar(50), address]
    ]

    const outputs: StoredProcedureOutput[] = [
        ["id", mssql.Int]
    ];

    const result = await storedProcedure("RegisterClient", inputs, outputs);
    return {
        success: !!result.returnValue,
        data: result.output.id
    }

}


async function deleteClient(clientID: number):
    Promise<DBResult<undefined>> {
    const inputs: StoredProcedureInput[] = [
        ["id", mssql.Int, clientID]];
    const result = await storedProcedure("DeleteClient", inputs);
    return { success: !!result.returnValue, data: undefined };
}


async function getUserClients(username:string):
    Promise<DBResult<DBClientData[]>> {
    const inputs: StoredProcedureInput[] = [
        ["username", mssql.NVarChar(50), username]];
    const result = await storedProcedure("GetUserClients", inputs);
    return {
        success: !!result.returnValue,
        data: result.recordset
    };
}


async function checkUsernameValid(useranme: string):
    Promise<DBResult<undefined>> {
    const inputs: StoredProcedureInput[] = [
        ["username", mssql.NVarChar(50), useranme]
    ];
    const result = await storedProcedure("CheckUsernameTaken", inputs);
    return { success: !result.returnValue, data: undefined };
}

async function checkEmailValid(email: string):
    Promise<DBResult<undefined>> {
    const inputs: StoredProcedureInput[] = [
        ["email", mssql.NVarChar(50), email]
    ];
    const result = await storedProcedure("CheckEmailTaken", inputs);
    return { success: !result.returnValue, data: undefined };
}



const DatabaseHandler = {
    registerUser,
    getPassword,
    updatePassword,
    registerClient,
    deleteClient,
    getUserClients,
    checkUsernameValid,
    checkEmailValid
}

export default DatabaseHandler;