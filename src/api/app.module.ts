import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VotesModule } from './votes/votes.module'

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		VotesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
