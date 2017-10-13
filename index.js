const Benchmark = require('benchmark');
const nativeTests = require('./compiled/native').default;
const browserTests = require('./compiled/browser').default;
const AsciiTable = require('ascii-table');

const runSuite = (suiteName, tests) => {
  const suite = new Benchmark.Suite(suiteName, {
    minSamples: 50,
  });

  const testNames = Object.keys(tests);
  const projectNamesSet = new Set();
  const table = new AsciiTable(suiteName);

  const getRunName = (testName, projectName) => `${testName}: ${projectName}`;

  testNames.forEach((testName) => {
    Object.keys(tests[testName]).forEach((projectName) => {
      projectNamesSet.add(projectName);
      suite.add(getRunName(testName, projectName), tests[testName][projectName]);
    });
  });

  const projectNames = Array.from(projectNamesSet);

  table.setHeading('', ...projectNames);

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

    console.log(table.toString());
  });

  suite.run();
};

runSuite('native', nativeTests);
runSuite('browser', browserTests);
