import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';

const styles = {
  root: {
    cursor: 'pointer',
    userSelect: 'none',
    border: 'none',
    outline: 'none',
    '-webkit-tap-highlight-color': 'transparent',
    background: 'transparent',
    '&:focus, &:active': {
      outline: 'none',
      border: 0
    },
    '&:hover': { opacity: 0.9 }
  }
};

const ButtonBase = ({ children, className, ...other }) => {
  return (
    <button className={cx(css(styles.root), className)} {...other}>
      {children}
    </button>
  );
};
ButtonBase.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
};
export default ButtonBase;
