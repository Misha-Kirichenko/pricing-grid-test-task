import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { REGEXES } from 'src/common/constants/regexes.constant';

type Constructor<T = any> = new (...args: any[]) => T;

export function IsDateRangeValid(
  validationOptions?: ValidationOptions,
): ClassDecorator {
  return function (target: object) {
    registerDecorator({
      name: 'isDateRangeValid',
      target: target as Constructor,
      propertyName: '',
      options: validationOptions,
      validator: {
        validate(_: unknown, args: ValidationArguments): boolean {
          const obj = args.object as {
            dateFrom?: unknown;
            dateTo?: unknown;
          };

          if (
            typeof obj.dateFrom !== 'string' ||
            typeof obj.dateTo !== 'string'
          ) {
            return false;
          }

          const from: string = obj.dateFrom;
          const to: string = obj.dateTo;

          if (
            !REGEXES.IS_DATE_STRING.test(from) ||
            !REGEXES.IS_DATE_STRING.test(to)
          ) {
            return false;
          }

          const dateFrom = new Date(from);
          const dateTo = new Date(to);

          if (isNaN(dateFrom.getTime()) || isNaN(dateTo.getTime())) {
            return false;
          }

          return dateFrom <= dateTo;
        },

        defaultMessage(): string {
          return `Invalid date range: "dateTo" must greater or equal to "dateFrom", and both must be valid dates in YYYY-MM-DD format.`;
        },
      },
    });
  };
}
