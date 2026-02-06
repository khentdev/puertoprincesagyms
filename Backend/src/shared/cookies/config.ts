import type { Context } from 'hono'
import {
    deleteCookie,
    getCookie,
    getSignedCookie,
    setCookie,
    setSignedCookie,
} from 'hono/cookie'
import type { CookieOptions } from 'hono/utils/cookie'
import { env } from '../../configs/env.js'
import { tokenExpiry } from '../auth/token.js'

const isProd = () => env.NODE_ENV === 'production'

type CreateAuthCookieOptionsParams = {
    type: "sid" | "csrfToken"
    maxAge?: number
}
function createAuthCookieOptions({ type, maxAge }: CreateAuthCookieOptionsParams): CookieOptions {
    return {
        path: "/",
        domain: isProd() ? env.DOMAIN_NAME : undefined,
        maxAge,
        httpOnly: type === "sid",
        secure: isProd(),
        sameSite: 'lax',
        prefix: isProd() ? "secure" : undefined
    }
}

type SetAuthCookieParams = {
    c: Context
    token: string
    maxAge?: number
}
export const setRefreshTokenCookie = async ({ c, token, maxAge = tokenExpiry().refreshTokenMaxAge }: SetAuthCookieParams) =>
    await setSignedCookie(c, "sid", token, env.COOKIE_SECRET, createAuthCookieOptions({ type: "sid", maxAge }))
export const setCsrfTokenCookie = async ({ c, token, maxAge = tokenExpiry().csrfTokenMaxAge }: SetAuthCookieParams) =>
    await setSignedCookie(c, "csrfToken", token, env.COOKIE_SECRET, createAuthCookieOptions({ type: "csrfToken", maxAge }))

export const getRefreshTokenCookie = async (c: Context) => await getSignedCookie(c, env.COOKIE_SECRET, "sid")
export const getCsrfTokenCookie = async (c: Context) => await getSignedCookie(c, env.COOKIE_SECRET, "csrfToken")

export const deleteAuthCookie = (c: Context, name: "sid" | "csrfToken") =>
    deleteCookie(c, name, {
        path: "/",
        domain: isProd() ? env.DOMAIN_NAME : undefined,
        httpOnly: name === "sid",
        secure: isProd(),
        sameSite: 'lax',
        prefix: isProd() ? "secure" : undefined
    })

// Normal Cookie Generations
export const setNormalCookie = (c: Context, name: string, value: string) =>
    setCookie(c, name, value, {
        path: "/",
        domain: isProd() ? env.DOMAIN_NAME : undefined,
        httpOnly: false,
        secure: isProd(),
        sameSite: 'lax',
    })

export const getNormalCookie = (c: Context, name: string) => getCookie(c, name)

export const deleteNormalCookie = (c: Context, name: string) =>
    deleteCookie(c, name, {
        path: "/",
        domain: isProd() ? env.DOMAIN_NAME : undefined,
        httpOnly: false,
        secure: isProd(),
        sameSite: 'lax',
        prefix: isProd() ? "secure" : undefined
    })

