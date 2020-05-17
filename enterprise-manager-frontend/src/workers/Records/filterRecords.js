export const filters = (values, dataIndex) => {
  return [...new Set(values.map(value => value[dataIndex]))]
    .filter(v => v)
    .map(value => ({
      text: value,
      value: value,
    }));
};
