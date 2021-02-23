import { User } from './schemas/User';
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // time signed in
    secret: process.env.COOKIE_SECRET,
};

export default config({
    // @ts-ignore
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        }
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        // Add seed data here
    },
    lists: createSchema({
        // schema items go in here
        User
    }),
    ui: {
        // change this for rolls
        isAccessAllowed: () => true,
    }
    // Add session values here
})