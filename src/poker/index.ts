export namespace Poker {
	export const voteablePoints = [1, 2, 3, 5, 8] as const
	type Point = typeof voteablePoints[number]

	export type VoteResult = {
		count: Record<Point, number>,
		top: Partial<Record<Point, number>>,
	}


	type User = string
	type T = Record<User, number>

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
