import { JwtAlgorithmNotImplemented, JwtTokenInvalid, JwtTokenSignatureMismatched, JwtTokenNotBefore, JwtTokenIssuedAt, JwtTokenExpired } from "hono/utils/jwt/types";

export type TokenPayload = {
    userId: string
    devideId: string
    iss: string
}

export type TokenPayloadNoIss =
    Omit<TokenPayload, "iss">

export type JwtErrorConstructor =
    | typeof JwtAlgorithmNotImplemented
    | typeof JwtTokenInvalid
    | typeof JwtTokenExpired
    | typeof JwtTokenIssuedAt
    | typeof JwtTokenNotBefore
    | typeof JwtTokenSignatureMismatched;

