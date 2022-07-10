import core from "@actions/core";
import github from "@actions/github";
import { getAllInputs } from "./inputs";

try {
  const inputs = getAllInputs();
} catch (error) {}
