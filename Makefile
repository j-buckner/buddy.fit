up:
	docker-compose up -d

down:
	docker-compose down

start:
	docker-compose up -d && cd ./app; yarn && yarn local

deploy.app:
	cd app; yarn build && gcloud app deploy app.yaml

deploy.infra:
	cd infra; gcloud app deploy app.yaml