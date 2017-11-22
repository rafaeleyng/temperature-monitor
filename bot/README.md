# temperature-monitor-bot

This bot receives commands from the user and communicates with the API.

## Create the bot

Create the bot using the BotFather, on Telegram App, and obtain a token.

## Run the bot code

This deploy is based on [now](https://zeit.co/now).

1. Create a `.env` file with the Telegram bot token:

    ```
    TOKEN=<telegram bot token, the same that temperature-monitor-bot>
    API_URL=<url for the api>
    ```

1. Run:

    ```
    yarn deploy
    ```

## Set bot commands

Use the command `/setcommands` in a chat with BotFather, and paster these commands:

```
last - <sensor id>
period - <sensor id> <from offset> [<to offset>]
range - <sensor id> <from temp> <to temp>
getrange - <sensor id>
subscribe - <sensor id>
unsubscribe - <sensor id>
```
