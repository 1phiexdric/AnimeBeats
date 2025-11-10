import jsonwebtoken from 'jsonwebtoken';
import { env } from "$env/dynamic/private";


const secret = env.JWT_SECRET!
export function generateToken(email: string){
    return jsonwebtoken.sign(
        { email }, 
        secret, 
        { expiresIn: '1h' }
    );
}

export function verificarToken(token: string){
    try{
        const data = jsonwebtoken.verify(token, secret)
        return data
    }catch(e){
        throw new Error('Token no coincide')
    }
}