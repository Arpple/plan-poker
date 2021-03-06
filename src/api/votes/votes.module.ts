import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthMiddleware } from '../middleware/auth.middleware'
import { VotesController } from './votes.controller'
import { Vote } from '../../database/entity/vote.entity'
import { VoteRepo } from '../../database/repo/vote.repo'
import { PokerService } from '../../service/poker/poker.service'
import { AuthService } from 'src/service/auth/auth.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([Vote, VoteRepo]),
	],
	controllers: [VotesController],
	providers: [PokerService.T, AuthService.T],
})
export class VotesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes('*')
	}
}
