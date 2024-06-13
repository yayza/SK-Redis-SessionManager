import type { Redis } from 'ioredis';
import type { RedisClientType } from 'redis';
import type { Redis as upstashRedisClient } from '@upstash/redis';
import type { Cookies } from '@sveltejs/kit';
export declare const generateRandomString: (size?: number, alphabet?: string) => string;
export declare const getSessionKey: (sessionPrefix: string, sessionId: string) => string;
export declare const getUserSessionKey: (userSessionsPrefix: string, userId: string) => string;
export declare const formattedReturn: (data: any, error: boolean, message: string) => {
    data: any;
    error: boolean;
    message: string;
};
export declare const signSessionKey: (key: string, secret: string) => Promise<string>;
export declare const verifySignature: (signedCookie: string, secret: string) => Promise<string | null>;
export declare const validateCookie: (cookies: Cookies, cookieName: string, secret: string, signedCookies: boolean) => Promise<{
    data: any;
    error: boolean;
    message: string;
}>;
export interface CookieSerializeOptions {
    domain?: string | undefined;
    encode?(value: string): string;
    expires?: Date | undefined;
    httpOnly?: boolean | undefined;
    maxAge?: number | undefined;
    path?: string | undefined;
    priority?: 'low' | 'medium' | 'high' | undefined;
    sameSite?: true | false | 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean | undefined;
}
export interface ioRedisSessionOptions extends redisSessionOptions {
    redisClient: Redis;
}
export interface nodeRedisSessionOptions extends redisSessionOptions {
    redisClient: RedisClientType;
}
export interface upstashRedisSessionOptions extends redisSessionOptions {
    redisClient: upstashRedisClient;
}
interface redisSessionOptions {
    secret: string;
    cookieName?: string;
    userSessionsPrefix?: string;
    sessionPrefix?: string;
    signed?: boolean;
    useTTL?: boolean;
    renewSessionBeforeExpire?: boolean;
    renewBeforeSeconds?: number;
    serializer?: Serializer | JSON;
    cookiesOptions?: CookieSerializeOptions;
}
export declare const defaultExpireSeconds: number;
export declare const defaultRenewBeforeSeconds: number;
export declare const defaultCookiesOption: CookieSerializeOptions;
export type Serializer = {
    stringify: Function;
    parse: Function;
};
export {};
