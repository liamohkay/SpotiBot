import { useState } from 'react';

const useData = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  return [values, (newValues) => setValues(newValues)];
}