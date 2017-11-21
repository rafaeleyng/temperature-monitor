# temperature-monitor-bot

## Create the bot

Create the bot using the BotFather, on Telegram App.

## Run the bot code

This deploy is based on [now](https://zeit.co/now).

1. Create a `.env` file with the Telegram bot token:

  ```
  TOKEN=<telegram bot token>
  API_URL=<url for the api>
  ```

1. Run:

  ```
  yarn deploy
  ```

---

## Set bot commands

Use the command `/setcommands` in a chat with BotFather, and paster these commands:

```
last - <sensor id>
period - <sensor id> <from offset> [<to offset>]
```
