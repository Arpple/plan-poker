import app from './app'

async function bootstrap() {
	app.listen(3000, () => {
		console.log('start')
	})
}

bootstrap();
