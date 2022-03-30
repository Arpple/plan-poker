import { EntityRepository, Repository } from 'typeorm';
import { Vote } from '../entity/vote.entity';

@EntityRepository(Vote)
export class VoteRepo extends Repository<Vote> {
}
