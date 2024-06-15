import * as z from 'zod';

const preProcessInt = (d: any) => parseInt(z.string().parse(d));

export const PositionId = z.object({
    position_id: z.preprocess(preProcessInt, z.number().nonnegative()).optional()
});


export type PositionId = z.infer<typeof PositionId>;

