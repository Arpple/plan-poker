import { Body, Controller, Get, Header, Headers, Inject, Post } from '@nestjs/common'
import { VoteDto } from './interfaces/vote.dto'
import { VotesService } from './votes.service'

@Controller('votes')
export class VotesController {
	constructor(
		private votesService: VotesService,
	) {}

	@Get()
	public async getVotes() {
		return await this.votesService.getVoteResult()
	}

	@Post()
	public async create(
		@Headers('x-user') user: string,
		@Body() voteDto: VoteDto,
	) {
		await this.votesService.createVote(user, voteDto)
		return await this.votesService.getVoteResult()
	}
}
