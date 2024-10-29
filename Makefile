start:
	docker compose -f docker-compose.yaml up -d --build
	npm run start:api

stop:
	docker compose -f docker-compose.yaml down
	pkill -f "tsx watch"

restart: stop start

test-api:
	npm run test --workspace=packages/api

KNOXFILE_PATH=./packages/api/knexfile.js

.PHONY: migrate-up migrate-down migrate-create

migrate-up:
	npx knex migrate:latest --knexfile $(KNOXFILE_PATH)

migrate-down:
	npx knex migrate:rollback --knexfile $(KNOXFILE_PATH)

migrate-create:
	npx knex migrate:make "$(name)" --knexfile $(KNOXFILE_PATH)
