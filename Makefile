start: 
	npm install
	@if [ ! -f packages/api/.env ]; then \
		cp packages/api/.env.example packages/api/.env; \
	fi	
	docker compose -f docker/docker-compose.yaml up -d --build

stop:
	docker compose -f docker/docker-compose.yaml down
	pkill -f "tsx watch"

restart: stop start

test-api:
	npm run test --workspace=packages/api

KNOXFILE_PATH=./packages/api/knexfile.ts

.PHONY: migrate-up migrate-down migrate-create

migrate-up:
	npx knex migrate:latest --knexfile $(KNOXFILE_PATH)

migrate-down:
	npx knex migrate:rollback --knexfile $(KNOXFILE_PATH)

migrate-create:
	npx knex migrate:make "$(name)" --knexfile $(KNOXFILE_PATH)

seed:
	npx knex seed:run --knexfile $(KNOXFILE_PATH)

setup: migrate-up seed
