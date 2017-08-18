import React from 'react';
import { create as render } from 'react-test-renderer';
import styledSc from 'styled-components';
import cssta from 'cssta';

// this currently needs to be called "styled" due to this bug
// https://github.com/tkh44/emotion/issues/267
import styled from 'emotion/react';

import glamorous from 'glamorous';

export default {
  'simple component': {
    styled: () => {
      const Component = styledSc.div`
        color: red;
      `;

      render(<Component />);
    },
    cssta: () => {
      const Component = cssta.div`
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
    cssta: () => {
      const Component = cssta.div`
        color: black;

        &[danger] {
          color: red;
        }
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
    cssta: () => {
      const Component = cssta.div`
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
    cssta: () => {
      const Component = cssta.div`
        color: black;
        flex: 1;
        font: bold 12px/14px "Helvetica";
        margin: 1px 2px;
        padding: 3px 4px;
        border: 1px solid black;

        &[danger] {
          color: red;
        }
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
};
