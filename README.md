# Benchmark

Benchmarks performance for both browser and native styled-components. Also benchmarks [cssta](https://github.com/jacobp100/cssta).

To benchmark,

```bash
npm install
npm start
```

## Adding a Test

Under `tests`, there are files for each platform we test: currently browser and native. Each platform test file has a default export of an object whose keys are the test names. The values are objects keyed by the project name (currently `styled` or `cssta`), and the values of these objects are test functions. You do not need to add tests for every project.

```js
export default {
  'test name': {
    styled: () => {
      /* Test function body */
    }
  }
}
```

Tests are usually formed by creating a component, and running it through `react-test-renderer`.

```js
const Component = styled.div`
  color: ${props => props.color};
`;

const instance = render(<Component color="black" />);
instance.update(<Component color="red" />);
```

All tests are compiled using webpack. React uses production-mode optimisations, and the output is minified. Cssta also has production-mode optimisations.

Tests are benchmarked using Benchmark.js, so are run multiple times. If your test uses a global cache, you should clear the cache before running it.
