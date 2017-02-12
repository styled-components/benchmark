const Benchmark = require('benchmark');
require('console.table'); // eslint-disable-line
const nativeTests = require('./compiled/native').default;
const browserTests = require('./compiled/browser').default;

const runSuite = (suiteName, tests) => {
  const suite = new Benchmark.Suite();

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

  suite.on('complete', () => {
    const suiteResults = Array.from(suite);

    const header = [''].concat(projectNames);
    const rows = testNames.map(testName => (
      [testName].concat(projectNames.map((projectName) => {
        const runName = getRunName(testName, projectName);
        const run = suiteResults.find(run => run.name === runName); // eslint-disable-line
        return run
          ? `${(run.stats.mean * 1000).toFixed(3)}±${(run.stats.deviation * 1000).toFixed(3)}ms`
          : '-';
      }))
    ));

    console.log(`Results for ${suiteName}`);
    console.table(header, rows);
  });

  suite.run();
};

runSuite('native', nativeTests);
runSuite('browser', browserTests);
