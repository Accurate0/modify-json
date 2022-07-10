import fs from "fs/promises";
import * as core from "@actions/core";

export interface JSONFile {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const readFileAsJSON = async (filename: string): Promise<JSONFile> => {
  const getFile = async () => {
    try {
      const data = await fs.readFile(filename, {
        encoding: "utf-8",
      });
      return data;
    } catch (e) {
      core.error(`File not found: ${filename}`);
      throw e;
    }
  };

  const data = await getFile();
  try {
    const json = JSON.parse(data);

    return json as JSONFile;
  } catch (e) {
    core.error(`File is not valid JSON: ${filename}`);
    throw e;
  }
};

export const writeFile = async (filename: string, data: string) =>
  await fs.writeFile(filename, data);
