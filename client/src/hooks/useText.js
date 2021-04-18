import { useState } from 'react';

// Custom hook that stores user text input on change
const useText = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  return [
    values,
    (e) => setValues({ ...values, [e.target.name]: e.target.value })
  ];
}

export default useText;