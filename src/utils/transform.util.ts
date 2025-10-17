import { Transform } from 'class-transformer';

export const TransformToNumber = () =>
  Transform(({ value }: { value: unknown }) => {
    if (typeof value === 'string') {
      const num = Number(value);
      return isNaN(num) ? value : num;
    }
    return value as number;
  });

export const TransformToBoolean = () =>
  Transform(({ value }: { value: unknown }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  });
