import { Injectable } from '@nestjs/common'


export namespace AuthService {
	export class InvalidUserError extends Error {
		constructor(user: string) {
			super(`user ${user} not exists`)
		}
	}

	@Injectable()
	export class T {
		constructor() {}

		/**
		* @throws {InvalidUserError}
		*/
		public async validateUser(user: any): Promise<void> {
			if (!user) {
				throw new AuthService.InvalidUserError(user)
			}
		}
	}
}
