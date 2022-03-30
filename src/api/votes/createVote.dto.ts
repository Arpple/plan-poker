import { IsNumber } from 'class-validator';

export class CreateVoteDto {
	@IsNumber()
	readonly point: number
}
