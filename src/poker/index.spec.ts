import { pipe } from 'fp-ts/lib/function'
import { Poker } from '.'

describe('voting', () => {
	describe('when create new room', () => {
		const result = pipe(
			Poker.create(),
			Poker.getVoteResult,
		)

		it('should have no voted point', () => {
			expect(result.all).toEqual({
				[Poker.Score.One]: 0,
				[Poker.Score.Two]: 0,
				[Poker.Score.Three]: 0,
				[Poker.Score.Five]: 0,
				[Poker.Score.Eight]: 0,
			})
		})

		it('should have top vote as 0', () => {
			expect(result.top).toEqual([0])
		})
	})

	describe('when vote score', () => {
		const result = pipe(
			Poker.create(),
			Poker.vote('a', 3),
			Poker.vote('b', 5),
			Poker.vote('c', 3),
			Poker.getVoteResult,
		)

		it('should add point to vote result', () => {
			expect(result.all).toEqual({
				[Poker.Score.One]: 0,
				[Poker.Score.Two]: 0,
				[Poker.Score.Three]: 2,
				[Poker.Score.Five]: 1,
				[Poker.Score.Eight]: 0,
			})
		})

		it('should have top vote as most voted score', () => {
			expect(result.top).toEqual([3])
		})
	})
})

