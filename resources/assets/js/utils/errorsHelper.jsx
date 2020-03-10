import React from 'react';

export function createMarkup(errors) {
  const err = [];

  Object.keys(errors).forEach((item) => {
    Array.isArray(item) &&
      errors[item].map((value, index) => {
        return err.push(<p key={index}>{value}</p>);
      });
  });

  return err.length > 0 ? err : <p>Что-то пошло не так</p>;
}

export function getResponseError(errors) {
  if (errors && errors.response && errors.response.data && errors.response.data.errors) {
    return errors.response.data.errors
  } else {
    return 'Что-то пошло не так';
  }

}
