export namespace Poker {
	export enum Score {
		One = 1,
		Two = 2,
		Three = 3,
		Five = 5,
		Eight = 8,
	}

	export type VoteResult = {
		all: Record<Score, number>,
		top: number[],
	}


	export type T = {
	}

	export const create = (): T => {
		return {
			users: [],
		}
	}

	export const getVoteResult = (room: T): VoteResult => {
		return {
			all: {
				[Score.One]: 0,
				[Score.Two]: 0,
				[Score.Three]: 0,
				[Score.Five]: 0,
				[Score.Eight]: 0,
			},
			top: [0],
		}
	}
}
