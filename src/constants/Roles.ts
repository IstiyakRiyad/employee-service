
export const Role = {
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
} as const;


type keys = keyof typeof Role;
export type RoleValues = typeof Role[keys];
