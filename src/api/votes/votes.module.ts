import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesController } from './votes.controller';
import { Vote } from './votes.entity';
import { VoteRepository } from './votes.repository';
import { VotesService } from './votes.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Vote, VoteRepository]),
	],
	controllers: [VotesController],
	providers: [VotesService],
})
export class VotesModule {}
