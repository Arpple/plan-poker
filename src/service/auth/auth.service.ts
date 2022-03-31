import { Injectable } from '@nestjs/common'

export class InvalidUserError extends Error {
	constructor(user: string) {
		super(`user ${user} not exists`)
	}
}

@Injectable()
export class AuthService {
	constructor() {}

	/**
	 * @throws {InvalidUserError}
	 */
	public async validateUser(user: any): Promise<void> {
		if (!user) {
			throw new InvalidUserError(user)
		}
	}
}
