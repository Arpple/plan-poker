import { Router, Request, Response } from 'express';
import datasource from 'src/apiEx/datasource';
import { VoteService } from 'src/apiEx/service/vote';
import { VoteView } from 'src/apiEx/view/vote';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
	const result =  await VoteService.getVoteResult(datasource())
	return res.status(200).send({
		data: VoteView.resultView(result)
	})
})

module.exports = router
