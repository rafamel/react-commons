import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { css, cx } from 'emotion';

const Fade = ({
  children,
  in: inProp,
  timeout,
  style,
  className,
  ...other
}) => {
  return (
    <Transition in={!!inProp} timeout={timeout}>
      {(state) => (
        <div
          style={{ opacity: inProp ? 1 : 0, ...style }}
          className={cx(
            css({ transition: `all ${timeout}ms ease-in-out` }),
            className
          )}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};
Fade.propTypes = {
  in: PropTypes.any,
  timeout: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};
Fade.defaultProps = {
  timeout: 300
};

export default Fade;
