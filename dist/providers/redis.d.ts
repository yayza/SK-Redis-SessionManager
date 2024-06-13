import type { nodeRedisSessionOptions } from '../shared.js';
import type { Cookies } from '@sveltejs/kit';
export declare class RedisSessionStore {
    private readonly redisClient;
    private readonly secret;
    private readonly cookieName;
    private readonly uniqueIdGenerator;
    private readonly sessionPrefix;
    private readonly userSessionsPrefix;
    private readonly signedCookies;
    private readonly useTTL;
    private readonly ttlSeconds;
    private readonly renewSessionBeforeExpire;
    private readonly renewBeforeSeconds;
    private readonly serializer;
    private readonly cookieOptions;
    constructor({ redisClient, secret, cookieName, sessionPrefix, userSessionsPrefix, signed, useTTL, renewSessionBeforeExpire, renewBeforeSeconds, serializer, cookiesOptions }: nodeRedisSessionOptions);
    createSession: (cookies: Cookies, sessionData: any, userId: string) => Promise<{
        data: any;
        error: boolean;
        message: string;
    }>;
    getSession: (cookies: Cookies) => Promise<{
        data: any;
        error: boolean;
        message: string;
    }>;
    getSessionsByUserId: (userId: string) => Promise<{
        data: any;
        error: boolean;
        message: string;
    }>;
    deleteSession: (cookies: Cookies, userId?: null) => Promise<{
        data: any;
        error: boolean;
        message: string;
    }>;
    deleteSessionsByUserId: (userId: string) => Promise<{
        data: any;
        error: boolean;
        message: string;
    }>;
    deleteCookie: (cookies: Cookies) => Promise<void>;
    updateSession(cookies: Cookies, sessionData?: {}): Promise<{
        data: any;
        error: boolean;
        message: string;
    }>;
    updateSessionExpiry: (cookies: Cookies, skipValidation?: boolean, key?: string) => Promise<{
        data: any;
        error: boolean;
        message: string;
    }>;
}
