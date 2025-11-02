import 'dotenv/config';

const appConfig = {
    app: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
        name: process.env.NAME || 'chat-room',
        version: process.env.VERSION || '1.0.0-development',
        prefix: process.env.PREFIX || '/api/v1',
        description: process.env.DESCRIPTION || 'A simple chat room application',
        secret: process.env.APP_SECRET || 'supersecretkey'
    },
    database: {
        mongoDb: {
            uri: process.env.MONGO_URI || 'mongodb://localhost:27017/chat-room?authSource=admin',
        }
    }
};

export default appConfig;