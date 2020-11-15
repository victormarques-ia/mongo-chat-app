# Mongo Chat Server 

A server created with express and socket.io, for [real-time chat](https://github.com/victormarques-ia/react-chat-app-v1), where messages are saved linked to conversations.

## How to Run

- Create a **.env based** on .env.example
- Put the [mongo_url](https://docs.mongodb.com/manual/reference/connection-string/) on .env in DATABASE key
- After that, run the command `yarn` or `npm install`, to install the dependencies! 
- Finally run `yarn start` or `npm run` to start the application on http://localhost:8000.

## Technologies and dependencies

- Express with Typescript
- socket.io
- mongoose
