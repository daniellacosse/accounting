import consola from "consola";

import constants from "configuration/constants.yml";

/**
 * The main runner for this cli - wraps an async routine and handles it appropriately.
 *
 * @export
 * @param {function(): Promise<any>} routine The routine this main method will run.
 * @returns {void} n/a
 */
export default function main(routine: () => Promise<any>): void {
  routine()
    .then(stdout => JSON.stringify(stdout, null, constants.INDENT_SIZE))
    .then(consola.success)
    .catch(consola.error);
}
