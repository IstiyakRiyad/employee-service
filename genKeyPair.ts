import {generateKeyPairSync} from 'node:crypto';
import {writeFileSync} from 'fs';


const keyPair = () => {
    return generateKeyPairSync('ec', {
        namedCurve: 'prime256v1',

        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },

        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
}

const genKeyPair = () => {
    // Generate Refresh Token EC Keys
    const TokenKey = keyPair();

    writeFileSync('secretKeys/tokenECPrivate.pem', TokenKey.privateKey, 'utf8');
    writeFileSync('secretKeys/tokenECPublic.pem', TokenKey.publicKey, 'utf8');

    
    console.log('\x1b[32m%s\x1b[0m', `${TokenKey.publicKey}\n${TokenKey.privateKey}`);
}

genKeyPair();

