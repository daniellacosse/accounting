import test from "ava";
import moment from "moment";
import path from "path";

import { weekly } from "../filename-templator";
import { generateTemplateCommands } from "../template-file";

const testConfig: FileTemplateConfig = {
  additionalUrls: ["https://www.example.com"],
  command: "template",
  destination: "~/tmp",
  duration: "weekly",
  mimetype: "numbers"
};

const expectedDestFilename = weekly(
  moment()
    .startOf("day")
    .subtract(1, "weeks")
);

const expectedTemplatePath = path.resolve(
  __dirname,
  `../templates/template.numbers`
);

const expectedCommands = [
  `cp ${expectedTemplatePath} ~/tmp/${expectedDestFilename}.numbers`,
  `open ~/tmp/${expectedDestFilename}.numbers`,
  `open https://www.example.com`
];

test(`generates correct commands to run`, $ => {
  const testCommands = generateTemplateCommands(testConfig);

  $.deepEqual(testCommands, expectedCommands);
});
