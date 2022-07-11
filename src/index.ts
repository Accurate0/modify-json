import * as core from "@actions/core";
import { readFileAsJSON, writeFile } from "./file";
import { getAllInputs } from "./inputs";

try {
  const inputFilename = core.getInput("__inputFile");
  const outputFilename = core.getInput("__outputFile");

  readFileAsJSON(inputFilename)
    .then((f) => {
      const inputs = getAllInputs(f);

      Object.entries(inputs).forEach(([key, value]) => {
        f[key] = value;
      });

      writeFile(outputFilename, JSON.stringify(f));
    })
    .catch((e) => {
      core.error(e);
      throw e;
    });
} catch (error) {
  core.error("Unexpected error");
  throw error;
}
