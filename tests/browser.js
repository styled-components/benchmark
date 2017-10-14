import React from 'react';
import { create as render } from 'react-test-renderer';
import styledSc, { ThemeProvider as StyledThemeProvider } from 'styled-components';

// this currently needs to be called "styled" due to this bug
// https://github.com/tkh44/emotion/issues/267
import styled from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';

import glamorous, { ThemeProvider as GlamorousThemeProvider } from 'glamorous';

export default {
  'simple component': {
    styled: () => {
      const Component = styledSc.div`
        color: red;
      `;

      render(<Component />);
    },
    emotion: () => {
      const Component = styled.div`
        color: red;
      `;

      render(<Component />);
    },
    glamorous: () => {
      const Component = glamorous.div({
        color: 'red',
      });

      render(<Component />);
    },
  },

  'prop changes': {
    styled: () => {
      const Component = styledSc.div`
        color: ${props => (props.danger ? 'red' : 'black')};
      `;

      const instance = render(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
    },
    emotion: () => {
      const Component = styled.div`
        color: ${props => (props.danger ? 'red' : 'black')};
      `;

      const instance = render(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
    },
    glamorous: () => {
      const Component = glamorous.div(p => ({
        color: p.danger ? 'red' : 'black',
      }));

      const instance = render(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
    },
  },

  'prop shorthands': {
    styled: () => {
      const Component = styledSc.div`
        color: red;
        flex: 1;
        font: bold 12px/14px "Helvetica";
        margin: 1px 2px;
        padding: 3px 4px;
        border: 1px solid black;
      `;

      render(<Component />);
    },
    emotion: () => {
      const Component = styled.div`
        color: red;
        flex: 1;
        font: bold 12px/14px "Helvetica";
        margin: 1px 2px;
        padding: 3px 4px;
        border: 1px solid black;
      `;

      render(<Component />);
    },
    glamorous: () => {
      const Component = glamorous.div({
        color: 'red',
        flex: 1,
        font: 'bold 12px/14px "Helvetica"',
        margin: '1px 2px',
        padding: '3px 4px',
        border: '1px solid black',
      });

      render(<Component />);
    },
  },

  'prop shorthands with prop changes': {
    styled: () => {
      const Component = styledSc.div`
        color: ${props => (props.danger ? 'red' : 'black')};
        flex: 1;
        font: bold 12px/14px "Helvetica";
        margin: 1px 2px;
        padding: 3px 4px;
        border: 1px solid black;
      `;

      const instance = render(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
    },
    emotion: () => {
      const Component = styled.div`
        color: ${props => (props.danger ? 'red' : 'black')};
        flex: 1;
        font: bold 12px/14px "Helvetica";
        margin: 1px 2px;
        padding: 3px 4px;
        border: 1px solid black;
      `;

      const instance = render(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
    },
    glamorous: () => {
      const Component = glamorous.div({
        color: 'red',
        flex: 1,
        font: 'bold 12px/14px "Helvetica"',
        margin: '1px 2px',
        padding: '3px 4px',
        border: '1px solid black',
      }, p => ({
        color: p.danger ? 'red' : 'black',
      }));

      const instance = render(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
      instance.update(<Component />);
      instance.update(<Component danger />);
    },
  },

  'theming + dynamic styles': {
    styled: () => {
      const Ancestor = styledSc.div`
        color: red;
      `;

      const Child = styledSc.div`
        background-color: ${p => p.theme.backgroundColor};
        font-size: ${p => p.fontSize}px;
      `;

      const Parent = styledSc.div`
        border: 1px solid ${p => p.theme.borderColor};
        color: ${p => p.color};
      `;

      const theme = {
        backgroundColor: 'cornflowerblue',
        borderColor: 'antiquewhite',
      };

      const themeVariant = {
        backgroundColor: 'mistyrose',
        borderColor: 'gainsboro',
      };

      const getVariant = useVariant => (
        <StyledThemeProvider theme={useVariant ? themeVariant : theme}>
          <Ancestor>
            <Parent color={useVariant ? 'red' : 'black'}>
              <Child fontSize={useVariant ? 10 : 12} />
            </Parent>
          </Ancestor>
        </StyledThemeProvider>
      );

      const instance = render(getVariant());
      instance.update(getVariant(true));
      instance.update(getVariant());
      instance.update(getVariant(true));
      instance.update(getVariant());
      instance.update(getVariant(true));
    },
    emotion: () => {
      const Ancestor = styled.div`
        color: red;
      `;

      const Child = styled.div`
        background-color: ${p => p.theme.backgroundColor};
        font-size: ${p => p.fontSize}px;
      `;

      const Parent = styled.div`
        border: 1px solid ${p => p.theme.borderColor};
        color: ${p => p.color};
      `;

      const theme = {
        backgroundColor: 'cornflowerblue',
        borderColor: 'antiquewhite',
      };

      const themeVariant = {
        backgroundColor: 'mistyrose',
        borderColor: 'gainsboro',
      };

      const getVariant = useVariant => (
        <ThemeProvider theme={useVariant ? themeVariant : theme}>
          <Ancestor>
            <Parent color={useVariant ? 'red' : 'black'}>
              <Child fontSize={useVariant ? 10 : 12} />
            </Parent>
          </Ancestor>
        </ThemeProvider>
      );

      const instance = render(getVariant());
      instance.update(getVariant(true));
      instance.update(getVariant());
      instance.update(getVariant(true));
      instance.update(getVariant());
      instance.update(getVariant(true));
    },
    glamorous: () => {
      const Ancestor = glamorous.div({
        color: 'red',
      });

      const Child = glamorous.div(p => ({
        'background-color': p.theme.backgroundColor,
        'font-size': p.fontSize,
      }));

      const Parent = glamorous.div(p => ({
        border: `1px solid ${p.theme.borderColor}`,
        color: p.color,
      }));

      const theme = {
        backgroundColor: 'cornflowerblue',
        borderColor: 'antiquewhite',
      };

      const themeVariant = {
        backgroundColor: 'mistyrose',
        borderColor: 'gainsboro',
      };

      const dynamicRender = useVariant => render(
        <GlamorousThemeProvider theme={useVariant ? themeVariant : theme}>
          <Ancestor>
            <Parent color={useVariant ? 'red' : 'black'}>
              <Child fontSize={useVariant ? 10 : 12} />
            </Parent>
          </Ancestor>
        </GlamorousThemeProvider>,
      );

      dynamicRender();
      dynamicRender(true);
      dynamicRender();
      dynamicRender(true);
      dynamicRender();
      dynamicRender(true);
    },
  },
};
