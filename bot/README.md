# temperature-monitor-bot

This deploy is based on [now](https://zeit.co/now).

1. Create a `.env` file with the Telegram bot token:

  ```
  TOKEN=<telegram bot token>
  ```

1. Run:

  ```
  make deploy
  ```

1. Copy the URL and fill in `WEBHOOK_URL` in `.env`:

  ```
  WEBHOOK_URL=<webhook url given by the deploy>
  ```

1. Run:

  ```
  env $(cat .env | xargs) make delete-webhook
  env $(cat .env | xargs) make set-webhook
  ```
