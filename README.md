# Community Chat App

Welcome to the Community Chat App! This application enables real-time chat over a browser window, where users interact with anonymous usernames. The app tracks the message history and associated timestamp of the messages.

"Community Chat" is a personal project that I've used to understand the concept of websockets. Along with websockets I also learned to use of redis and kafkajs in through this project.
## Features

- **Real-time Communication**: Enjoy instant messaging with other community members.
- **Anonymous Usernames**: Users are assigned anonymous usernames for privacy.
- **Timestamps**: Every message is accompanied by a timestamp for reference.
- **Technologies**: Built with TurboRepo, Next.js, Node.js, Redis, PostgreSQL, and Kafka.

## Getting Started

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/shubhjena/chat-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd chat-app
    ```

3. Install dependencies:

    ```bash
    yarn install
    ```

4. Set up the required environment variables:

    ```bash
    cp .env.example .env
    ```

    Replace placeholder values in the `.env` file with your configuration.

5. Start the application:

    ```bash
    yarn dev
    ```

6. Open the app in your web browser.

## Technologies Used

- TurboRepo
- Next.js
- Node.js
- Redis
- PostgreSQL
- Kafka

## Database Setup

This app uses Redis and PostgreSQL for data storage. Ensure you have these databases configured and the connection details updated in the `.env` file.

## Kafka Configuration

Kafka is used for real-time event streaming. Set up your Kafka configuration in the `.env` file.

## Contributing

I welcome contributions from the community! If you'd like to contribute to the development of this chat app, feel free to create a pull request. Your input is valuable, and I look forward to collaborating on making this app even better. Feel free to share your ideas and improvements!

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit/) file for details.

---

Thank you for using our Community Chat App! If you have any questions or encounter issues, feel free to open an [issue](https://github.com/shubhjena/chat-app/issues). Happy chatting!
