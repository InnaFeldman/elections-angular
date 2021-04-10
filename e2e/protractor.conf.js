// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
 const puppeteer = require('puppeteer');
 exports.config = {
  // ...
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless'],
      binary: puppeteer.executablePath(),
    },
  },
  // ...
};
