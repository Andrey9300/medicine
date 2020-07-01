import React from 'react';

export function createMarkup(errors: any) {
  const err: any = [];

  if (Array.isArray(errors)) {
    Object.keys(errors).forEach((item: any, index) => {
      if (Array.isArray(item)) {
        const err = item as any;
        errors[err].map((value: any, ind: number) => {
          err.push(<p key={`${index}${ind}`}>{value}</p>);
        });
      } else {
        err.push(<p key={index}>{errors[item]}</p>);
      }
    });
  }

  return err.length > 0 ? err : <p>Что-то пошло не так</p>;
}

export function getResponseError(errors: any) {
  if (
    errors &&
    errors.response &&
    errors.response.data &&
    errors.response.data.errors
  ) {
    return errors.response.data.errors;
  } else {
    return 'Что-то пошло не так';
  }
}
