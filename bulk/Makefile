.PHONY: build
build:
	docker compose run consumer npm install

.PHONY: up
up:
	docker compose up -d rabbitmq

.PHONY: produce
produce:
	docker compose run consumer bin/producer.js

.PHONY: consume
consume:
	docker compose run consumer
