import * as z from 'zod';


const preProcessInt = (d: any) => parseInt(z.string().parse(d));

// login route check
export const ConfigSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default("production"),
    CLIENT_URL: z.string(),
    SERVER_URL: z.string(),
    PORT: z.preprocess(preProcessInt, z.number().min(0).max(65535)).optional(),

    POSTGRESQL_URL: z.string(),
    POSTGRESQL_USER: z.string(),
    POSTGRESQL_PASSWORD: z.string(),
    POSTGRESQL_DB: z.string(),

    LOGGLY_TOKEN: z.string().optional(),
    LOGGLY_SUBDOMAIN: z.string().optional(),

    TOKEN_TIMEOUT: z.preprocess(preProcessInt, z.number().nonnegative()),

    ADMIN_NAME: z.string(),
    ADMIN_EMAIL: z.string(),
    ADMIN_PASSWORD: z.string(),
});

export type ConfigSchema = z.infer<typeof ConfigSchema>;
