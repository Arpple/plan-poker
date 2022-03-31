import { BadRequestException, Body, Controller, Get, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthMiddleware } from '../auth/auth.middleware'
import { InvalidPointError, PokerService } from '../../service/poker/poker.service'
import { VotesView } from './votes.view'
import { IsNumber } from 'class-validator'

class CreateVoteDto {
	@IsNumber()
	readonly point: number
}

@Controller('votes')
export class VotesController {
	constructor(
		private votesService: PokerService,
	) {}

	@Get()
	public async getVotes() {
		const result =  await this.votesService.getVoteResult()
		return { data: VotesView.resultView(result) }
	}

	@Post()
	public async create(
		@Res() res: Response,
		@Body() createVoteDto: CreateVoteDto,
	) {
		try {
			const user = AuthMiddleware.getUser(res)
			await this.votesService.createVote(user, createVoteDto.point)
		} catch (error) {
			if (error instanceof InvalidPointError) {
				throw new BadRequestException(error.message)
			}

			throw error
		}

		const result = await this.votesService.getVoteResult()
		return res.status(200).send({ data: VotesView.resultView(result) })
	}
}

