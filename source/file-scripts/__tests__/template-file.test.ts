import moment from "moment";
import path from "path";

import { monthly, weekly } from "../filename-templator";
import { generateTemplateCommands } from "../template-file";

const testConfig: FileTemplateConfig = {
  command: "template",
  destination: "~/tmp",
  duration: "weekly",
  mimetype: "numbers"
};

const monthlyTestConfig: FileTemplateConfig = {
  command: "template",
  destination: "~/tmp",
  duration: "monthly",
  mimetype: "numbers"
};

const testConfigWithUrls: FileTemplateConfig = {
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

const expectedMonthlyDestFilename = monthly(
  moment()
    .startOf("week")
    .subtract(1, "months")
);

const expectedTemplatePath = path.resolve(
  __dirname,
  `../../templates/template.numbers`
);

const expectedCommands = [
  `cp ${expectedTemplatePath} ~/tmp/${expectedDestFilename}.numbers`,
  `open ~/tmp/${expectedDestFilename}.numbers`
];

const expectedMonthlyCommands = [
  `cp ${expectedTemplatePath} ~/tmp/${expectedMonthlyDestFilename}.numbers`,
  `open ~/tmp/${expectedMonthlyDestFilename}.numbers`
];

const expectedCommandsWithUrls = [
  `cp ${expectedTemplatePath} ~/tmp/${expectedDestFilename}.numbers`,
  `open ~/tmp/${expectedDestFilename}.numbers`,
  `open https://www.example.com`
];

test(`generates correct commands to run`, () => {
  const testCommands = generateTemplateCommands(testConfig);

  expect(testCommands).toEqual(expectedCommands);
});

test(`generates monthly commands`, () => {
  const testCommands = generateTemplateCommands(monthlyTestConfig);

  expect(testCommands).toEqual(expectedMonthlyCommands);
});

test(`handles additionalUrls`, () => {
  const testCommands = generateTemplateCommands(testConfigWithUrls);

  expect(testCommands).toEqual(expectedCommandsWithUrls);
});
