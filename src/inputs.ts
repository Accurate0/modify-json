const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

const set = (obj: any, path: string[], value: any) => {
  var schema = obj; // a moving reference to internal objects within obj
  var len = path.length;
  for (var i = 0; i < len - 1; i++) {
    var elem = path[i];
    if (!schema[elem]) schema[elem] = {};
    schema = schema[elem];
  }

  schema[path[len - 1]] = value;
};

export const getAllInputs = () => {
  const inputs: { [key: string]: any } = {};

  Object.entries(process.env).forEach(([key, value]) => {
    if (!/^INPUT_/.test(key)) return;
    if (key === "INPUT___INPUTFILE") return;
    if (key === "INPUT___OUTPUTFILE") return;

    const inputName = key.slice("INPUT_".length);
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
