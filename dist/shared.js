import { dev } from '$app/environment';
// code copied from Nanoid:
// https://github.com/ai/nanoid/blob/9b748729f8ad5409503b508b65958636e55bd87a/index.browser.js
// nanoid uses Node dependencies on default bundler settings
const getRandomValues = (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
const DEFAULT_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
export const generateRandomString = (size = 36, alphabet = DEFAULT_ALPHABET) => {
    const mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1;
    const step = -~((1.6 * mask * size) / alphabet.length);
    let bytes = getRandomValues(step);
    let id = '';
    let index = 0;
    while (id.length !== size) {
        id += alphabet[bytes[index] & mask] ?? '';
        index += 1;
        if (index > bytes.length) {
            bytes = getRandomValues(step);
            index = 0;
        }
    }
    return id;
};
export const getSessionKey = (sessionPrefix, sessionId) => {
    return [sessionPrefix, sessionId].join(':');
};
export const getUserSessionKey = (userSessionsPrefix, userId) => {
    return [userSessionsPrefix, userId].join(':');
};
export const formattedReturn = (data, error, message) => {
    return { data, error, message };
};
const importKey = async (secret) => {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
};
export const signSessionKey = async (key, secret) => {
    const secretKeyEncoded = await importKey(secret);
    const signature = await crypto.subtle.sign('HMAC', secretKeyEncoded, new TextEncoder().encode(key));
    const newDigest = btoa(String.fromCharCode(...new Uint8Array(signature)));
    return `${key}.${newDigest}`;
};
export const verifySignature = async (signedCookie, secret) => {
    const valueWithSignature = signedCookie.split('.');
    try {
        const value = valueWithSignature[0];
        const signature = valueWithSignature[1];
        const key = await importKey(secret);
        const sigBuf = Uint8Array.from(atob(signature), (c) => c.charCodeAt(0));
        const isValidSignature = await crypto.subtle.verify('HMAC', key, sigBuf, new TextEncoder().encode(value));
        if (!isValidSignature) {
            return null;
        }
        return value;
    }
    catch (e) {
        console.log('decryption error: ', e);
        return null;
    }
};
export const validateCookie = async (cookies, cookieName, secret, signedCookies) => {
    const cookiesSessionKey = cookies.get(cookieName);
    if (!cookiesSessionKey)
        return formattedReturn(null, true, 'No session found in cookies.');
    let verifiedSessionKey = cookiesSessionKey;
    if (signedCookies)
        verifiedSessionKey = (await verifySignature(verifiedSessionKey, secret));
    if (!verifiedSessionKey)
        return formattedReturn(null, true, 'Cookies session is not verified.');
    return formattedReturn(verifiedSessionKey, false, 'Successfully validated cookies');
};
export const defaultExpireSeconds = 60 * 60 * 24; // One day in seconds
export const defaultRenewBeforeSeconds = 30 * 60; // 30 minutes in seconds
export const defaultCookiesOption = {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: !dev,
    maxAge: defaultExpireSeconds
};
