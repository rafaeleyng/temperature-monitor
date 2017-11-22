# temperature-monitor-bot-notifier

This is the application that uses the bot to notify the chatIds that are subscribed for notifications.

The reason why it is a different application than the `temperature-monitor-bot` is because I'm deploying it on [now](https://zeit.co/now), and it only allows an application to bind a single port, and I need two (one for the bot to receive commands, one to run an server and receive the notifications from the AWS Lambda function).

## Create the bot

See the docs on the [bot documentation](../bot). This app will use the same Telegram Bot.

## Run

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
