import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  root: {
    cursor: 'pointer',
    userSelect: 'none',
    border: 'none',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    background: 'transparent',
    '&:focus, &:active': {
      outline: 'none',
      border: 0
    },
    '&:hover': { opacity: 0.9 }
  }
};

const ButtonBase = ({ children, ...other }) => {
  return (
    <button css={styles.root} {...other}>
      {children}
    </button>
  );
};
ButtonBase.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
};
export default ButtonBase;
