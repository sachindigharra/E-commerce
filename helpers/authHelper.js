import bcrypt, { hash } from 'bcrypt';
// import { hashPassword } from './authHelper.js';


export const hashPassword = async (password) =>{
    try{
        const salt = 10 ;
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch(err){
        console.log(err);
    }
}
export const comparePassword = async (password,hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}