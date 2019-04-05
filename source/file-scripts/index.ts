import templates from "configuration/templates.yml";
import templateFile from "./template-file";

/**
 * Takes a supported file command, runs that function, and returns the result.
 *
 * @export
 * @param {string} userCommand The command that this script runner will run.
 * @returns {Promise<any>} A promise containing the results
 */
export default async function fileScriptRunner(
  userCommand: string
): Promise<any> {
  const template = templates.find(({ command }) => command === userCommand);

  if (!template) {
    return Promise.reject(`
      ${userCommand} is not an appropriate command parameter -
      try \`yarn start file:checkup\`
    `);
  }

  return templateFile(template);
}
