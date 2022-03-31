import { Poker } from 'src/lib/poker'

export namespace VotesView {
	export type Result = Poker.VoteResult & {
		extra: string,
	}

	export const resultView = (result: Poker.VoteResult): Result => {
		return {
			...result,
			extra: 'something for view',
		}
	}
}
