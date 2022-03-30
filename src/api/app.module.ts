import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/service/auth/auth.service';
import { VotesModule } from './votes/votes.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		VotesModule,
	],
	controllers: [],
	providers: [AuthService],
})
export class AppModule {}
