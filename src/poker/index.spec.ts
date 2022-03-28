import { pipe } from 'fp-ts/lib/function'
import { Poker } from '.'

describe('voting', () => {
	describe('when create new room', () => {
		const result = pipe(
			Poker.create(),
			Poker.getVoteResult,
		)

		it('should have all point count as 0', () => {
			expect(result.count).toEqual({
				1: 0,
				2: 0,
				3: 0,
				5: 0,
				8: 0,
			})
		})

		it('should have all point as top (same count 0)', () => {
			expect(result.top).toEqual({
				1: 0,
				2: 0,
				3: 0,
				5: 0,
				8: 0,
			})
		})
	})

	describe('when vote point', () => {
		const result = pipe(
			Poker.create(),
			Poker.vote('a', 3),
			Poker.vote('b', 5),
			Poker.vote('c', 3),
			Poker.getVoteResult,
		)

		it('should add point to vote count', () => {
			expect(result.count).toEqual({
				1: 0,
				2: 0,
				3: 2,
				5: 1,
				8: 0,
			})
		})

		it('should have most voted point as top', () => {
			expect(result.top).toEqual({
				3: 2,
			})
		})
	})

	describe('when vote have multiple top point', () => {
	})
})

