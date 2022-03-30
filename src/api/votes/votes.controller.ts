import { BadRequestException, Body, Controller, Get, Headers, Post } from '@nestjs/common'
import { CreateVoteDto } from './createVote.dto'
import { InvalidPointError, VotesService } from './votes.service'
import { VotesView } from './votes.view'

@Controller('votes')
export class VotesController {
	constructor(
		private votesService: VotesService,
	) {}

	@Get()
	public async getVotes() {
		const result =  await this.votesService.getVoteResult()
		return VotesView.resultView(result)
	}

	@Post()
	public async create(
		@Headers('x-user') user: string,
		@Body() createVoteDto: CreateVoteDto,
	) {
		try {
			await this.votesService.createVote(user, createVoteDto)
			const result = await this.votesService.getVoteResult()
			return VotesView.resultView(result)
		} catch (error) {
			if (error instanceof InvalidPointError) {
				throw new BadRequestException(error.message)
			}

			throw error
		}
	}
}
