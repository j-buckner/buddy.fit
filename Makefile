up:
	docker-compose up -d

down:
	docker-compose down

start:
	docker-compose up -d && cd ./app; yarn start

deploy.app:
	cd app; npm run build && gcloud app deploy app.yml

deploy.infra:
	cd infra; gcloud app deploy app.yml