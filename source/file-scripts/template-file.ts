import moment from "moment";
import path from "path";

import commandRunner from "./command-runner";
import { monthly, weekly, trimesterly } from "./filename-templator";

/**
 * Opens up all the resources necessary to complete the Weekly Checkup.
 *
 * @export generateTemplateCommands
 * @param {FileTemplateConfig} templateSource - the `numbers` template to generate
 * @returns {string[]} - the list of commands to run
 */
export function generateTemplateCommands({
  command,
  mimetype,
  destination,
  duration,
  additionalUrls
}: FileTemplateConfig): string[] {
  const templatePath = path.resolve(
    __dirname,
    `../templates/${command}.${mimetype}`
  );

  let filename;

  switch (duration) {
    case "weekly":
      filename = weekly(
        moment()
          .startOf("day")
          .subtract(1, "weeks")
      );
      break;
    case "monthly":
      filename = monthly(
        moment()
          .startOf("month")
          .subtract(1, "month")
      );
      break;
    case "trimesterly":
      filename = trimesterly(
        moment()
          .startOf("month")
          .subtract(1, "month")
      );
  }

  const destinationPath = `${destination}/${filename}.${mimetype}`;

  let finalUrlsToOpen: string[];

  if (additionalUrls) {
    finalUrlsToOpen = additionalUrls.reduce(
      (result: string[], url: string) => result.concat([`open ${url}`]),
      []
    );
  } else {
    finalUrlsToOpen = [];
  }

  return [
    `cp ${templatePath} ${destinationPath}`,
    `open ${destinationPath}`,
    ...finalUrlsToOpen
  ];
}

/**
 * Runs a series of shell commmands that copy the template for this last week
 * and opens the relevant links for quicker completion of the checkup report.
 *
 * @export weeklyCheckup
 * @param {FileTemplateConfig} template various config around how the file should be templated
 * @returns {string} Message containing the number of commands successfully run
 */
export default (template: FileTemplateConfig) => {
  return commandRunner(generateTemplateCommands(template));
};
