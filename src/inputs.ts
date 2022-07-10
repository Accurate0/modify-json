export const getAllInputs = () => {
  const inputs: { [key: string]: string | undefined } = {};

  Object.entries(process.env).forEach(([key, value]) => {
    if (!/^INPUT_/.test(key)) return;

    const inputName = key.slice("INPUT_".length);
    inputs[inputName as any] = value;
  });

  return inputs;
};
