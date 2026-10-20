import { randomInt } from 'node:crypto';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Devuelve un código aleatorio, por ejemplo "aB3xK9z"
export function generateCode(length = 7) {
    let code = '';
    for (let i = 0; i < length; i++) {
    code += ALPHABET[randomInt(ALPHABET.length)];
    }
    return code;
}