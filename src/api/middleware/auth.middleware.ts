import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { AuthService, InvalidUserError } from 'src/service/auth/auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private authService: AuthService,
	) {}

	public use(req: Request, res: Response, next: NextFunction) {
		const user = req.header('x-user')

		try {
			this.authService.validateUser(user)
		} catch (error) {
			if (error instanceof InvalidUserError) {
				throw new UnauthorizedException()
			}

			throw error
		}

		res.locals.user = user
		next()
	}

	public static getUser(res: Response): string {
		return res.locals.user
	}
}
