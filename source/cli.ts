// #!/usr/bin/env node

import constants from "configuration/constants.yml";
import fileScriptRunner from "./file-scripts";
import main from "./main";
import trelloScriptRunner from "./trello-scripts";

/*
  commands are passed to this script in the form of <DOMAIN>:<COMMAND>

  where DOMAIN is the app or api being accessed

  and COMMAND is the actual kind of command being run
*/

main(async () => {
  const [DOMAIN, COMMAND] = process.argv[
    constants.DOMAIN_AND_COMMAND_INDEX
  ].split(":");

  switch (DOMAIN) {
    case "trello":
      return trelloScriptRunner(COMMAND);

    case "file":
      return fileScriptRunner(COMMAND);

    case "echo":
      return Promise.resolve(`echoing: ${COMMAND}`);

    default:
      return Promise.reject(`
        ${DOMAIN} is not an appropriate command domain -
        try \`yarn start trello:rollup\`
      `);
  }
});
