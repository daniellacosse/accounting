import { exec } from "shelljs";

/**
 * Runs the list of given shell commands.
 *
 * @export commandRunner
 * @param {string[]} commands - the commands to run
 * @returns {string} - result message indicating commands run
 */
export default function commandRunner(commands: string[]): string {
  const successfulCommands = commands.filter(
    command => exec(command).code === 0
  );

  return `Completed - ran ${successfulCommands.length} commands!`;
}
