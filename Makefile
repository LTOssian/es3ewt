start:
	docker compose -f docker-compose.yaml up -d --build
	npm run start:api

stop:
	docker compose -f docker-compose.yaml down
	pkill -f "tsx watch"

restart: stop start

test-api:
	npm run test --workspace=packages/api