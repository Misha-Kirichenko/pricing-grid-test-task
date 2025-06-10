import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { REGEXES } from 'src/common/constants/regexes.constant';

export function IsDateOnly(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateOnly',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args?: ValidationArguments) {
          if (typeof value !== 'string') return false;
          if (!REGEXES.IS_DATE_STRING.test(value)) return false;

          const date = new Date(value);
          return (
            !isNaN(date.getTime()) &&
            value === date.toISOString().substring(0, 10)
          );
        },
        defaultMessage() {
          return 'date must be valid string in YYYY-MM-DD format';
        },
      },
    });
  };
}
