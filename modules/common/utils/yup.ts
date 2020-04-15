import * as yup from 'yup';

declare module 'yup' {
  interface Schema<T> {
    strip(strip?: boolean): this;
  }

  interface StringSchema {
    numeric(): this;
    trimBetween(): this;
  }
}

yup.addMethod(yup.string, 'numeric', function() {
  return this.transform(function(value: string | number) {
    if (!value) {
      return null;
    }

    if (typeof value === 'number') {
      return value.toFixed(0);
    }

    return value.replace(/\D/g, '');
  });
});

yup.addMethod(yup.string, 'trimBetween', function() {
  return this.transform(function(value) {
    if (!value) {
      return null;
    }

    return value.replace(/\s+/g, ' ');
  });
});
