import express, { NextFunction, Request, Response } from 'express'
import { HttpError } from './httpError'

require('express-async-errors')

const app = express()

app.use('/', require('./router'))

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof HttpError.Base) {
		return res.status(err.statusCode).send({
			error: err.message,
			...err.payload,
		})
	}

	return res.status(500).send({
		error: err.message
	})
})

export default app
