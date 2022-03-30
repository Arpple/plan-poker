import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotesModule } from './votes/votes.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		VotesModule,
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
