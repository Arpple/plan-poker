import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { pipe } from 'fp-ts/lib/function'
import { Poker } from 'src/lib/poker'
import { Vote } from '../../database/entity/vote.entity'
import { VoteRepo } from '../../database/repo/vote.repo'

export namespace PokerService {
	export class InvalidPointError extends Error {
		constructor(point: number) {
			super(`point is not valid ${point}`)
		}
	}

	@Injectable()
	export class T {
		constructor(
			@InjectRepository(VoteRepo) private voteRepo: VoteRepo,
		) {}

		/**
		* @throws {InvalidPointError}
		*/
		public async getVoteResult(): Promise<Poker.VoteResult> {
			const votes = await this.voteRepo.find()
			return pipe(
				this.voteEntityToRoom(votes),
				Poker.getVoteResult,
			)
		}

		/**
		* @throws {InvalidPointError}
		*/
		public async createVote(user: string, point: number): Promise<void> {
			await this.voteRepo.save({
				user,
				point: this.validatePoint(point)
			})
		}

		private validatePoint(point: any): Poker.Point {
			if (!Poker.voteablePoints.includes(point)) {
				throw new InvalidPointError(point)
			}

			return point
		}

		private voteEntityToRoom(votes: Vote[]): Poker.T {
			return votes.reduce(
				(room, vote) => Poker.vote(vote.user, this.validatePoint(vote.point))(room),
				Poker.create()
			)
		}
	}
}
