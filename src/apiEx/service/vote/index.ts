import { IsNumber } from 'class-validator';
import { pipe } from 'fp-ts/lib/function';
import { Vote } from 'src/apiEx/entity/votes.entity';
import { Poker } from 'src/lib/poker';
import { Connection } from 'typeorm';

export namespace VoteService {
	export async function getVoteResult(conn: Connection): Promise<Poker.VoteResult> {
		const votes = await conn.getRepository(Vote).find()
		return pipe(
			voteEntityToRoom(votes),
			Poker.getVoteResult,
		)
	}

	export class CreateVote {
		@IsNumber()
		point: number
	}

	export class InvalidPointError extends Error {
		constructor(point: any) {
			super(`invalid point ${point}`)
		}
	}

	export async function createVote(conn: Connection) {
		return async (user: string, createVoteDto: CreateVote): Promise<void> => {
			await conn.getRepository(Vote).save({
				user,
				point: validatePoint(createVoteDto.point)
			})
		}
	}

	function validatePoint(point: any): Poker.Point {
		if (!Poker.voteablePoints.includes(point)) {
			throw new InvalidPointError(point)
		}

		return point
	}

	function voteEntityToRoom(votes: Vote[]): Poker.T {
		return votes.reduce(
			(room, vote) => Poker.vote(vote.user, this.validatePoint(vote.point))(room),
			Poker.create()
		)
	}
}
