const Benchmark = require('benchmark');
const AsciiTable = require('ascii-table');
const progress = require('pace');
const nativeTests = require('./compiled/native').default;
const browserTests = require('./compiled/browser').default;

function getTotalTestCount(suites) {
  let total = 0;

  Object.values(suites).forEach((suite) => {
    Object.keys(suite).forEach((test) => {
      Object.keys(suite[test]).forEach(() => {
        total += 1;
      });
    });
  });

  return total;
}

function runSuites(suites) {
  const bar = progress(getTotalTestCount(suites));

  function runSuite(suiteName, tests) {
    return new Promise((resolve) => {
      const suite = new Benchmark.Suite(suiteName, {
        minSamples: 50,
      });

      const testNames = Object.keys(tests);
      const projectNamesSet = new Set();

      const getRunName = (testName, projectName) => `${testName}: ${projectName}`;

      testNames.forEach((testName) => {
        Object.keys(tests[testName]).forEach((projectName) => {
          projectNamesSet.add(projectName);
          suite.add(getRunName(testName, projectName), tests[testName][projectName]);
        });
      });

      const projectNames = Array.from(projectNamesSet);

      /**
      * something in the dep tree is fubaring the string "styled-components"
      * when used as a suite key
      */
      const projectNamesWithVersions = projectNames.map(
        // eslint-disable-next-line
        lib => `${lib} (v${require(`${lib === 'styled' ? 'styled-components' : lib}/package.json`).version})`
      );

      const table = new AsciiTable(suiteName);

      table.setHeading('', ...projectNamesWithVersions);

      suite.on('cycle', () => bar.op());

      suite.on('error', err => console.error(err.target.error) && suite.abort());

      suite.on('complete', () => {
        const suiteResults = Array.from(suite);
        const rows = testNames.map(testName => (
          [testName].concat(projectNames.map((projectName) => {
            const runName = getRunName(testName, projectName);
            const run = suiteResults.find(run => run.name === runName); // eslint-disable-line
            return run
              ? `${(run.stats.mean * 1000).toFixed(3)}±${(run.stats.deviation * 1000).toFixed(3)}ms`
              : '-';
          }))
        ));

        rows.forEach(row => table.addRow(row));

        resolve(table.toString());
      });

      suite.run();
    });
  }

  const results = Object.keys(suites).map(suiteName => runSuite(suiteName, suites[suiteName]));

  results.forEach(async result => console.log(await result));
}

runSuites({
  browser: browserTests,
  native: nativeTests,
});
