// src/validators.test.ts

import { AuthLogin } from './Auth';
import { ZodError } from 'zod';

describe('AuthLogin Schema', () => {
  test('should validate a valid AuthLogin object', () => {
    const validAuthLogin = {
      email: 'istiyak.riyad@gmail.com',
      password: 'randomPassword'
    };

    expect(() => AuthLogin.parse(validAuthLogin)).not.toThrow();
  });

  test('should fail validation for missing email', () => {
    const invalidAuthLogin = {
      password: 'randomPassword'
    };

    expect(() => AuthLogin.parse(invalidAuthLogin)).toThrow(ZodError);
  });

  test('should fail validation for missing password', () => {
    const invalidAuthLogin = {
      email: 'istiyak.riyad@gmail.com'
    };

    expect(() => AuthLogin.parse(invalidAuthLogin)).toThrow(ZodError);
  });

  test('should fail validation for extra fields', () => {
    const invalidAuthLogin = {
      email: 'istiyak.riyad@gmail.com',
      password: 'randomPassword',
      extraField: 'notAllowed'
    };

    expect(() => AuthLogin.parse(invalidAuthLogin)).toThrow(ZodError);
  });

  test('should fail validation for invalid types', () => {
    const invalidAuthLogin = {
      email: 111,
      password: []
    };

    expect(() => AuthLogin.parse(invalidAuthLogin)).toThrow(ZodError);
  });
});

