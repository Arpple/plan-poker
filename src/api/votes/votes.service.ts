import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { pipe } from "fp-ts/lib/function";
import { Poker } from "src/lib/poker";
import { VoteDto } from "./interfaces/vote.dto";
import { Vote } from "./votes.entity";
import { VoteRepository } from "./votes.repository";

export class InvalidPointError extends Error {
	constructor(point: number) {
		super(`point is not valid ${point}`)
	}
}

@Injectable()
export class VotesService {
	constructor(
		@InjectRepository(VoteRepository) private voteRepo: VoteRepository,
	) {}

	public async getVoteResult(): Promise<Poker.VoteResult> {
		const votes = await this.voteRepo.find()
		return pipe(
			this.voteEntityToRoom(votes),
			Poker.getVoteResult,
		)
	}

	public async createVote(user: string, voteDto: VoteDto): Promise<void> {
		await this.voteRepo.save({
			user,
			point: this.validatePoint(voteDto.point)
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
