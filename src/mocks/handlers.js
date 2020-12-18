// src/mocks/handlers.js
import { rest } from 'msw'
export const handlers = [
  // Handles a POST /login request
  rest.get('https://auto1-mock-server.herokuapp.com/api/colors', (req, res, ctx) => {
      console.log("colors????")
    return res(
      ctx.json({
        title: 'Lord of the Rings',
        author: 'J. R. R. Tolkien',
      }),
    )
  }),
  // Handles a GET /user request
  rest.get('https://auto1-mock-server.herokuapp.com/api/manufacturers', (req, res, ctx) => {
    console.log("manufacturers????")
    return res(
      ctx.json({
        title: 'Lord of the Rings',
        author: 'J. R. R. Tolkien',
      }),
    )
  }),
]