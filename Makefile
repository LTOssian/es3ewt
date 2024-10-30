start: 
	@$(MAKE) dockerUp
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

dockerUp:
	@echo "Running installation of modules..."
	@npm i

	@echo "Creating docker .env if missing..."
	@touch docker/.env
	@grep -q '^POSTGRES_DB=' docker/.env || echo "POSTGRES_DB=es3ewt" >> docker/.env
	@grep -q '^POSTGRES_USER=' docker/.env || echo "POSTGRES_USER=postgres" >> docker/.env
	@grep -q '^POSTGRES_PASSWORD=' docker/.env || echo "POSTGRES_PASSWORD=postgres" >> docker/.env
	@grep -q '^MINIO_ROOT_USER=' docker/.env || echo "MINIO_ROOT_USER=minioadmin" >> docker/.env
	@grep -q '^MINIO_ROOT_PASSWORD=' docker/.env || echo "MINIO_ROOT_PASSWORD=minioadmin" >> docker/.env
	@grep -q '^CONNECTION_STRING=' docker/.env || echo "CONNECTION_STRING=postgresql://postgres:postgres@es3ewt-db:5432/es3ewt" >> docker/.env

	@echo "Starting containers..."
	cd docker && docker-compose -p es3ewt up