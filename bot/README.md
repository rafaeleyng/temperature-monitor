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


## Examples

![bot list commands](https://user-images.githubusercontent.com/4842605/33105270-7896bbbe-cf13-11e7-9819-eddbbaffd35a.png)

![bot start range period](https://user-images.githubusercontent.com/4842605/33105269-78747db0-cf13-11e7-81f5-404b7fef6d3d.png)

![bot plot](https://user-images.githubusercontent.com/4842605/33105268-784ede02-cf13-11e7-8ca4-a5bb1040af93.jpeg)

![bot getrange subscribe notification unsubscribe](https://user-images.githubusercontent.com/4842605/33105267-7828b72c-cf13-11e7-9d3a-ce8067942b53.png)
