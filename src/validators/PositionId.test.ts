import { PositionId } from './PositionId';
import { ZodError } from 'zod';


describe('PositionId Schema', () => {
  test('should validate a valid PositionId object with position_id as a string number', () => {
    const validPositionId = {
      position_id: '112'
    };

    expect(() => PositionId.parse(validPositionId)).not.toThrow();
  });

  test('should validate a invalid PositionId', () => {
    const validPositionId = {
      position_id: 123
    };

    expect(() => PositionId.parse(validPositionId)).toThrow(ZodError);
  });

  test('should validate an empty PositionId object', () => {
    const validPositionId = {};

    expect(() => PositionId.parse(validPositionId)).not.toThrow();
  });

  test('should fail validation for a negative position_id', () => {
    const invalidPositionId = {
      position_id: '-123'
    };

    expect(() => PositionId.parse(invalidPositionId)).toThrow(ZodError);
  });

  test('should fail validation for a non-numeric position_id', () => {
    const invalidPositionId = {
      position_id: 'abc'
    };

    expect(() => PositionId.parse(invalidPositionId)).toThrow(ZodError);
  });

  test('should fail validation for a non-string, non-number position_id', () => {
    const invalidPositionId = {
      position_id: {}
    };

    expect(() => PositionId.parse(invalidPositionId)).toThrow(ZodError);
  });
});

