import React from 'react';

export function createMarkup(errors) {
  const err = [];

  Object.keys(errors).forEach((item, index) => {
    if (Array.isArray(item)) {
      errors[item].map((value, ind) => {
        err.push(<p key={`${index}${ind}`}>{value}</p>);
      });
    } else {
      err.push(<p key={index}>{errors[item]}</p>);
    }
  });

  return err.length > 0 ? err : <p>Что-то пошло не так</p>;
}

export function getResponseError(errors) {
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
