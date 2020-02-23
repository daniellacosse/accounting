// #!/usr/bin/env node
import consola from "consola";
import constants from "../configuration/constants.yml";
import fileScriptRunner from "./file-scripts";
import trelloScriptRunner from "./trello-scripts";

/*
  commands are passed to this script in the form of <DOMAIN>:<COMMAND>

  where DOMAIN is the app or api being accessed

  and COMMAND is the actual kind of command being run
*/

/**
 * the main entrypoint for the CLI. decides how to run the commands given in the shell
 *
 * @param {Domain} domain the resource to utilize (file system, trello, etc.)
 * @param {string} command an action to take with said resource
 * @returns {Promise<Messageable>} a message to be logged in consola
 */
const cliRouter = (domain: Domain, command: string): Promise<Messageable> => {
  switch (domain) {
    case "trello":
      return trelloScriptRunner(command);

    case "file":
      return fileScriptRunner(command);

    case "echo":
      return Promise.resolve(`echoing: ${command}`);

    default:
      return Promise.reject(`
        ${domain} is not an appropriate command domain -
        try \`yarn start trello:rollup\`
      `);
  }
};

// READ INPUT AND START //
(async function(): Promise<void> {
  const [DOMAIN, COMMAND] = (
    process.argv[constants.DOMAIN_AND_COMMAND_INDEX] || "echo:nocommand"
  ).split(":");

  try {
    consola.success(await cliRouter(DOMAIN as Domain, COMMAND));
  } catch (e) {
    consola.error(e);
  }
})();
