import { ValidationError } from 'class-validator'

export namespace HttpError {
	export class Base extends Error {
		public constructor(
			public statusCode: number,
			public message: string,
			public payload: object = {},
		) {
			super(message)
		}
	}

	export class BadRequest extends Base {
		public constructor(message: string) {
			super(400, message)
		}
	}

	export class Validation extends Base {
		public code = 422
		public errors: ValidationError[]

		constructor(validationErrors: ValidationError[]) {
			super(422, 'validation error', {
				message: validationErrors.map((e) => e.toString()),
			})
		}
	}
}
