import {readFileSync} from 'fs';
import {resolve} from 'path';
import {sign, verify, JwtPayload} from 'jsonwebtoken';


const publicKey = readFileSync(resolve('secretKeys/tokenECPublic.pem'), 'utf8');
const privateKey = readFileSync(resolve('secretKeys/tokenECPrivate.pem'), 'utf8');


// Make a token
export const signToken = (payload: object, expireTime = 604800) => {
    // Return Promise
    return new Promise<string | undefined>((resolve, reject)=> {
        // Sign the payload with json web token
        sign(payload, privateKey, { algorithm: 'ES256', expiresIn: expireTime }, (err, token) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
}

// Verify Token
export const verifyToken = (token: string) => {
    // Return Promise
    return new Promise<JwtPayload>((resolve, reject) => {
        // Verify json web token
        verify(token, publicKey, (err, payload) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(payload as JwtPayload);
            }
        });
    });
}


