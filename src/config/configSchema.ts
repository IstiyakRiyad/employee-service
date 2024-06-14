import * as z from 'zod';

// login route check
export const ConfigSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default("production"),
    CLIENT_URL: z.string(),
    SERVER_URL: z.string(),
    PORT: z.number(),

    POSTGRESQL_URL: z.string(),
    POSTGRESQL_USER: z.string(),
    POSTGRESQL_PASSWORD: z.string(),
    POSTGRESQL_DB: z.string(),

    LOGGLY_TOKEN: z.string().optional(),
    LOGGLY_SUBDOMAIN: z.string().optional(),
}).strict();

export type ConfigSchema = z.infer<typeof ConfigSchema>;
