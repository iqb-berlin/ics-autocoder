run:
	docker compose up

run-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.ics-ac up

down-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down

build-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml build


include .env.ics-ac
push-iqb-registry:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.ics-ac build
	docker login scm.cms.hu-berlin.de:4567
	docker push $(REGISTRY_PATH)ics-ac:$(TAG)
	docker logout
