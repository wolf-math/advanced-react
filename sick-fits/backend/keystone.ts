import { createAuth } from '@keystone-next/auth';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // time signed in
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // add initial roles
    }
});

export default withAuth(config({
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
        User,
        Product,
        ProductImage
    }),
    ui: {
        // show ui only for users who pass test
        isAccessAllowed: ({ session }) => {
            return !!session?.data;
        },
    },
    session: withItemData(statelessSessions(sessionConfig), {
        User: `id`
    })
}));
