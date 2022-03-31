import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Vote {
	@PrimaryColumn()
	user: string

	@Column('int')
	point: number
}
