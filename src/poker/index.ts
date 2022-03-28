export namespace Poker {
	export enum Point {
		One = 1,
		Two = 2,
		Three = 3,
		Five = 5,
		Eight = 8,
	}

	export type VoteResult = {
		count: Record<Point, number>,
		top: Partial<Record<Point, number>>,
	}


	type User = string
	export type T = Record<User, number>

	export const create = (): T => {
		return {}
	}

	export const vote = (user: string, point: Point) => (room: T): T => {
		return {
			...room,
			[user]: point,
		}
	}

	export const getVoteResult = (room: T): VoteResult => {
		const getPointCount = (point: Point): number =>
			Object.values(room)
				.filter((p) => p === point)
				.length

		const count = {
			1: getPointCount(1),
			2: getPointCount(2),
			3: getPointCount(3),
			5: getPointCount(5),
			8: getPointCount(8),
		}

		const maxCount = Object.values(count)
			.reduce(
				(max, count) => count > max
					? count
					: max,
				0
			)

		const top = Object.entries(count)
			.filter(([_, count]) => count === maxCount)
			.reduce(
				(record, [point, count]) => ({
					...record,
					[point]: count,
				}),
				{}
			)

		return { count, top }
	}
}
