import dotenv from 'dotenv';
import { exit } from 'process';

if (dotenv.config().error) {
    console.error("DOT ENV FILE NOT FOUND, EXITING!")
    exit(-1);
}


type DotEnvProps =
    | "DB_USER"
    | "DB_PASSWORD"
    | "JWT_SECRET"
    | "NODE_ENV"
    | "PEM_KEYPHRASE"
    ;


export default process.env as Record<DotEnvProps, string>;



