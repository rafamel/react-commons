import React from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web';

class LottiePlayer extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    loop: PropTypes.bool
  };
  static defaultProps = {
    loop: true
  };
  node = null;
  componentDidMount() {
    if (!this.node) return;
    const { data, loop } = this.props;

    const opts = {
      container: this.node,
      renderer: 'svg',
      loop,
      autoplay: true
    };

    if (typeof data === 'string') opts.path = data;
    else opts.animationData = data;
    lottie.loadAnimation(opts);
  }
  render() {
    const { data, loop, ...other } = this.props;

    return (
      <div
        ref={(ref) => {
          this.node = ref;
        }}
        {...other}
      />
    );
  }
}

export default LottiePlayer;
