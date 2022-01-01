
import appConfig from '@app/config/appConfig';
import { ClientData } from '@app/types/interfaces';
import mssql, { MSSQLError } from 'mssql';
import DatabaseHandler from './DatabaseHandler'


describe("Testing MSSQL Database StoredProcedures.", () => {
    const _newEntry = `${+new Date()}${Math.random().toString(36).substring(9)}`;


    const predefinedUser = {
        id: 41,
        username: "jest_testing3",
        email: "jest_testing3@test.com",
        passwordPlain: "Aabcd12345!!!",
        passwordHash: "$2b$10$FUPTL9zsnIe8PWW61Yub3.hAOR.MCSXPNNSMjkUPeBU/hG.hP4G7e"
    };

    const generateNewClient = (): ClientData => ({
        fullname: "Test Testberg",
        address: "Test valley",
        dob: new Date(1970, 1, 1),
        email: `testberg${_newEntry}@test.com`,
        phoneNumber: `${Math.random().toString(10).substring(10)} `

    });



    describe("Testing connection to database", () => {
        it("Creating connection", async () => {
            const connection = await mssql.connect(appConfig.mssqlConfig);
            expect(connection.connected).toBe(true);
            await connection.close()
            expect(connection.connected).toBe(false);
        })
    })


    describe("Testing DatabaseHandler.registerUser", () => {
        const newUser = _newEntry;
        const newEmail = `${_newEntry}@abc.com`;
        const { passwordHash } = predefinedUser;


        it("Creating new user", async () => {
            const { success, data } = await DatabaseHandler.registerUser(newEmail, newUser, passwordHash);
            expect(success).toBe(true);
            expect(data).not.toBe(-1);
        })

        it("Except throwing when trying to create new user with existing username and email", async () => {
            await DatabaseHandler.registerUser(newEmail, newUser, passwordHash).catch(e => expect(e));
        });

    });


    describe('Testing DatabaseHandler.getPassword', () => {
        const { username, passwordHash } = predefinedUser;

        it("Trying to get password of nonexistent user, expecting throw", async () => {
            const { success, data } = await DatabaseHandler.getPassword("-1");
            expect(success).toBe(false);
            expect(data).toBeFalsy();
        })

        it("Comparing predefined password and user", async () => {
            const { success, data } = await DatabaseHandler.getPassword(username);
            expect(success).toBe(true);
            // TODO: This will fail.
            expect(data[1].Password).toEqual(passwordHash);
        })
    })

    describe('Testing DatabaseHandler.registerClient', () => {

        const { username } = predefinedUser;


        it("Trying to create a new Client for an existing user", async () => {
            const { success, data } = await DatabaseHandler.registerClient(username, generateNewClient());
            expect(success).toBe(true);
            expect(data).not.toEqual(-1);
        });

        it("Trying to create a new Client for a nonexisting user", async () => {
            await expect(DatabaseHandler.registerClient("-1", generateNewClient())).rejects.toThrow();
        })

    })


    describe('Testing DatabaseHandler.deleteClient', () => {

        const { username } = predefinedUser;

        it("Creating new Client then deleting them", async () => {
            const { success: successRegisterCLient, data } = await DatabaseHandler.registerClient(username, generateNewClient());
            expect(successRegisterCLient).toBe(true);
            expect(data).not.toBe(-1);
            const { success: successDeleteClient } = await DatabaseHandler.deleteClient(data);
            expect(successDeleteClient).toBe(true);
        })

        it("Trying to delete nonexisting client should result with fail", async () => {
            const { success } = await DatabaseHandler.deleteClient(-1);
            expect(success).toBe(false);
        })

    })

    describe('Testing DatabaseHandler.getUserClients', () => {
        const { username } = predefinedUser;

        it("Getting all clients of an existing user", async () => {
            const { success, data: clients } = await DatabaseHandler.getUserClients(username);
            expect(success).toBe(true);
            const first = clients[0];
            expect(first).toBeTruthy();
            expect(typeof first.Id).toBe('number');
            expect(first.UserId).not.toEqual(0);
        });

        it("Trying to get all clients of a nonexisting user", async () => {
            const { success, data: clients } = await DatabaseHandler.getUserClients("-1")
            expect(success).toBe(false);
            expect(clients).toEqual([]);
        })

    })

    describe('Testing DatabaseHandler.checkUsernameTaken', () => {

        it("Checking a proven already existing username", async () => {

            const { username } = predefinedUser;

            const { success } = await DatabaseHandler.checkUsernameValid(username);
            expect(success).toBe(false);
        });

        it("Checking a proven nonexisting username", async () => {
            const username = "ABUYA3";

            const { success } = await DatabaseHandler.checkUsernameValid(username);
            expect(success).toBe(true);
        })

    })
    describe('Testing DatabaseHandler.checkEmailTaken', () => {

        it("Checking a proven already existing username", async () => {
            const { email } = predefinedUser;
            const { success } = await DatabaseHandler.checkEmailValid(email);
            expect(success).toBe(false);
        });

        it("Checking a proven nonexisting username", async () => {
            const email = "ABUYA3@ABUYA5.com";
            const { success } = await DatabaseHandler.checkEmailValid(email);
            expect(success).toBe(true);
        })

    })


});
