import { EntityRepository, Repository } from 'typeorm';
import { Vote } from './votes.entity';

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
}
