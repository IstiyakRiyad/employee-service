import * as z from 'zod';

// login route check
export const AuthLogin = z.object({
    email: z.string(),
    password: z.string()
}).strict();

export type AuthLogin = z.infer<typeof AuthLogin>;

