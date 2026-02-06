import { randomUUID } from "crypto";
import { sign, verify } from 'hono/jwt';
import { JwtAlgorithmNotImplemented, JwtTokenExpired, JwtTokenInvalid, JwtTokenIssuedAt, JwtTokenNotBefore, JwtTokenSignatureMismatched } from "hono/utils/jwt/types";
import type { SessionErrorCodes } from "../../features/session/errors.js";
import { env } from "../../configs/env.js";
import loadEnv from "../../configs/loadEnv.js";
import { AppError } from "../../errors/appError.js";
import type { JwtErrorConstructor, TokenPayload, TokenPayloadNoIss } from "./types.js";

export function tokenExpiry() {
    const now = Math.floor(Date.now() / 1000);

    const accessTokenDuration = parseInt(loadEnv("JWT_ACCESS_TOKEN_EXPIRES_IN", "3600"), 10);
    const refreshTokenDuration = parseInt(loadEnv("JWT_REFRESH_TOKEN_EXPIRES_IN", "2592000"), 10);

    return {
        accessTokenExpiry: now + accessTokenDuration,
        refreshTokenExpiry: now + refreshTokenDuration,
        refreshTokenMaxAge: refreshTokenDuration,
        csrfTokenMaxAge: refreshTokenDuration,
    }
}

const generateAccessToken = async (payload: TokenPayloadNoIss) => {
    const { accessTokenExpiry } = tokenExpiry()
    const now = Math.floor(Date.now() / 1000)
    return sign({
        ...payload,
        iat: now,
        exp: accessTokenExpiry,
        iss: env.JWT_ISSUER,
        nonce: randomUUID()
    },
        env.JWT_SECRET, "HS512")
}

const generateRefreshToken = async (payload: TokenPayloadNoIss) => {
    const { refreshTokenExpiry } = tokenExpiry()
    const now = Math.floor(Date.now() / 1000)
    return sign({
        ...payload,
        iat: now,
        exp: refreshTokenExpiry,
        iss: env.JWT_ISSUER,
        nonce: randomUUID()
    },
        env.JWT_SECRET, "HS512")
}

export const generateAuthTokens = async (payload: TokenPayload) => {
    const { refreshTokenExpiry } = tokenExpiry()
    const accessToken = await generateAccessToken(payload)
    const refreshToken = await generateRefreshToken(payload)
    const csrfToken = randomUUID()
    return { accessToken, refreshToken, csrfToken, refreshTokenExpiry }
}

export const verifyToken = async (token: string) => {
    try {
        const payload = await verify(token, env.JWT_SECRET, "HS512") as TokenPayload
        if (payload.iss !== env.JWT_ISSUER) throw new AppError("TOKEN_INVALID")
        return payload
    }
    catch (err) {
        if (err instanceof AppError) throw mapTokenError(err)
        throw new AppError("TOKEN_INVALID")
    }
}

const errMap = new Map<JwtErrorConstructor, SessionErrorCodes>([
    [JwtAlgorithmNotImplemented, "TOKEN_INVALID"],
    [JwtTokenInvalid, "TOKEN_INVALID"],
    [JwtTokenSignatureMismatched, "TOKEN_INVALID"],
    [JwtTokenNotBefore, "TOKEN_INVALID"],
    [JwtTokenIssuedAt, "TOKEN_INVALID"],
    [JwtTokenExpired, "TOKEN_EXPIRED"],
]);

const mapTokenError = (err: Error) => {
    const code = errMap.get(err.constructor as JwtErrorConstructor);
    if (code) return new AppError(code);
    return new AppError("TOKEN_INVALID");
};