import { useState } from 'react';

// Custom hook that stores user text input on change
export const useText = (initialValues) => {
  const [values, setValues] = useState(intialValues);
  return [
    values,
    (e) => setValues({ ..values, [e.target.name]: e.target.value })
  ];
}