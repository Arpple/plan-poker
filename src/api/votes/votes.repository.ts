import { EntityRepository, Repository } from "typeorm";
import { VoteDto } from "./interfaces/vote.dto";
import { Vote } from "./votes.entity";

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
	createVote = async (user: string, voteDto: VoteDto) => {
		return await this.save({
			user,
			point: voteDto.point,
		})
	}
}
