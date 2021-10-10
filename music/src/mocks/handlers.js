import {rest} from 'msw';

const API_URL = "http://localhost:3001";

export const handlers = [
    // rest.post(`${API_URL}/auth/register`, (req, res, ctx) => {
    //     return res(
    //         ctx.status(201),
    //         ctx.json({token: token})
    //     )
    // }),
    // rest.post(`${API_URL}/auth/token`, (req, res, ctx) => {
    //     return res(
    //         ctx.status(200),
    //         ctx.json({token: token})
    //     )
    // }),
    rest.get(`${API_URL}/users/hang/songs/1119072024`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({favorited: true})
        )
    })
]