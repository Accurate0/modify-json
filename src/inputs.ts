const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const set = (obj: any, path: string[], value: any) => {
  let schema = obj;
  const len = path.length;
  for (let i = 0; i < len - 1; i++) {
    const elem = path[i];
    if (!schema[elem]) schema[elem] = {};
    schema = schema[elem];
  }

  schema[path[len - 1]] = value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllInputs = (obj: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputs: { [key: string]: any } = obj;

  Object.entries(process.env).forEach(([key, value]) => {
    if (!/^INPUT_/.test(key)) return;
    if (key === "INPUT___INPUTFILE") return;
    if (key === "INPUT___OUTPUTFILE") return;

    const inputName = key.slice("INPUT_".length);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newValue: any;

    try {
      newValue = JSON.parse(value ?? "");
    } catch {
      newValue = value;
    }

    const nested = inputName.split("__").map((s) => snakeToCamel(s));
    set(inputs, nested, newValue);
  });

  return inputs;
};
