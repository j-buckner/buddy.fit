up:
	docker-compose up -d

down:
	docker-compose down

start:
	docker-compose up -d && cd ./app; yarn start