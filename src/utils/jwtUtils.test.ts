import { signToken, verifyToken } from "./jwtUtils";
import { JwtPayload } from 'jsonwebtoken';

describe('Test Token Functions', () => {
    const payload = { userId: 3, username: 'istiyak' };
    let token: string | undefined;

    test('should sign a token', async () => {
        token = await signToken(payload);

        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
    });

    test('should verify a token', async () => {
        const decoded = await verifyToken(token || "") as JwtPayload;

        expect(decoded).toBeDefined();
        expect(decoded.userId).toBe(payload.userId);
        expect(decoded.username).toBe(payload.username);
    });

    test('should throw an error for invalid token', async () => {
        const invalidToken = 'invalidRandomToken';

        await expect(verifyToken(invalidToken)).rejects.toThrow();
    });
});

