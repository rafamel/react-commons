import React from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import isEqual from 'lodash.isequal';

class BoundsAware extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    onSizeChange: PropTypes.func
  };
  rootNode = null;
  observer = new ResizeObserver((entries) => {
    const contentRect = entries[0].contentRect;
    const { bottom, height, left, right, top, width, x, y } = contentRect;
    this.setDimensions({ bottom, height, left, right, top, width, x, y });
  });
  updateDimensions = () => {
    if (!this.rootNode) return;
    const contentRect = this.rootNode.getBoundingClientRect();
    const { bottom, height, left, right, top, width, x, y } = contentRect;
    this.setDimensions({ bottom, height, left, right, top, width, x, y });
  };
  setDimensions = (dimensions) => {
    if (!isEqual(dimensions, this.lastDimensions)) {
      this.lastDimensions = dimensions;
      if (this.props.onSizeChange) {
        this.props.onSizeChange(this.lastDimensions);
      }
    }
  };
  componentDidUpdate() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.observer.observe(this.rootNode);
  }
  componentWillUnmount() {
    this.observer.unobserve(this.rootNode);
    window.removeEventListener('resize', this.updateDimensions);
  }
  render() {
    // eslint-disable-next-line
    const { children, onSizeChange, ...other } = this.props;
    return (
      <div
        ref={(ref) => {
          this.rootNode = ref;
        }}
        {...other}
      >
        {this.props.children}
      </div>
    );
  }
}

export default BoundsAware;
