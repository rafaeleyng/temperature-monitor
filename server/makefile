.PHONY: db

APP_IMAGE=temperature-monitor-node
APP_CONTAINER=temperature-monitor-node

MONGO_CONTAINER=temperature-monitor-mongo

app:
	-docker rm -f $(APP_CONTAINER)
	-docker rmi -f $(APP_IMAGE)
	docker build . -t $(APP_IMAGE)
	docker run --name $(APP_CONTAINER) -p 3000:3000 $(APP_IMAGE)

db:
	docker run --name $(MONGO_CONTAINER) -p 27017:27017 -d mongo@3.4.9
