export const defaults = (values: {}, defaultValues: {}): {} => {
  const newValues = {};

  for (const key in defaultValues) {
    if (defaultValues[key]) {
      newValues[key] = values[key] || defaultValues[key];
    }
  }

  return newValues;
};
