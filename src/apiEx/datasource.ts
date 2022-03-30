import { Connection } from 'typeorm'

export default () => new Connection({
	type: "sqlite",
	database: ".db.sqlite",
	entities: ["dist/**/*.entity{.ts,.js}"],
	synchronize: true
})
