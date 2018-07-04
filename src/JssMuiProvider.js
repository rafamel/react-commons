import React from 'react';
import PropTypes from 'prop-types';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';

const drop = document.createElement('noscript');
drop.id = 'jss-drop';
document.head.insertBefore(drop, document.head.firstChild);

const jss = create(jssPreset());
const generateClassName = createGenerateClassName();
jss.options.insertionPoint = drop;

const JssMuiProvider = ({ children }) => {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      {children}
    </JssProvider>
  );
};
JssMuiProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default JssMuiProvider;
