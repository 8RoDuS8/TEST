import DatabaseHandler from './database/DatabaseHandler';


(async () => {
    const [id, username, email, plainPW, hashPW] =
        [41, "jest_testing3", "jest_testing3@test.com", "Aabcd12345!!!", "$2b$10$FUPTL9zsnIe8PWW61Yub3.hAOR.MCSXPNNSMjkUPeBU/hG.hP4G7e"];

    const result = await DatabaseHandler.getPassword(username).catch(e => e);
    console.log(result);
})();
