import appConfig from '@app/config/appConfig';
import bcrypt from 'bcrypt'
import validator from 'validator';



const isPasswordStrong = (password: string) => {
    return validator.isStrongPassword(password, appConfig.passwordStrengthConfig);
}

const ROUNDS = 10;

const generateHash = async (password: string) => {
    return bcrypt.hash(password, ROUNDS)
};


const comparePasswords = async (password: string, hash: string) => {
    return bcrypt.compare(`${password}`, `${hash}`);
}



export {
    comparePasswords, generateHash, isPasswordStrong
}