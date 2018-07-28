import React from 'react';
import PropTypes from 'prop-types';
import Fade from './Fade';

class LoadFadeIn extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    timeout: PropTypes.number,
    onLoad: PropTypes.func
  };
  static defaultProps = {
    timeout: 10000
  };
  state = {
    ready: false
  };
  componentDidMount() {
    this._isMounted = true;
    if (this.state.ready) return;

    const startAt = Date.now();
    const interval = setInterval(() => {
      if (
        document.readyState === 'complete' ||
        Date.now() - startAt > this.props.timeout
      ) {
        clearInterval(interval);
        if (this.props.onLoad) this.props.onLoad();
        if (this._isMounted) this.setState({ ready: true });
      }
    }, 50);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { className, style } = this.props;
    const ready = this.state.ready;
    const hide = ready
      ? { ...style }
      : { ...style, maxHeight: '100vh', opacity: 0, overflow: 'hidden' };
    return (
      <Fade in={ready} timeout={400}>
        <div className={className} style={hide}>
          {this.props.children}
        </div>
      </Fade>
    );
  }
}

export default LoadFadeIn;
