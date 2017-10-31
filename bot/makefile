.PHONY: deploy set-webhook delete-webhook

set-webhook:
	curl -F "url=${WEBHOOK_URL}" https://api.telegram.org/bot${TOKEN}/setWebhook

delete-webhook:
	curl https://api.telegram.org/bot${TOKEN}/deleteWebhook

deploy:
	now --public --dotenv=.env
