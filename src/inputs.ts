const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

export const getAllInputs = () => {
  const inputs: { [key: string]: string | undefined } = {};

  Object.entries(process.env).forEach(([key, value]) => {
    if (!/^INPUT_/.test(key)) return;
    if (key === "INPUT___INPUTFILE") return;
    if (key === "INPUT___OUTPUTFILE") return;

    const inputName = key.slice("INPUT_".length);
    try {
      inputs[snakeToCamel(inputName)] = JSON.parse(value ?? "");
    } catch {
      inputs[snakeToCamel(inputName)] = value;
    }
  });

  return inputs;
};
