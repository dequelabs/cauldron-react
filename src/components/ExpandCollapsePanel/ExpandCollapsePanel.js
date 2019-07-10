import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PanelTrigger from './PanelTrigger';
import {
  injectStyleTag,
  setStyle,
  removeStyleTag
} from '../../utils/stylesheets';

export default class ExpandCollapsePanel extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    animationTiming: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    onToggle: PropTypes.func
  };

  state = {
    isOpen: false
  };

  static defaultProps = {
    animationTiming: 250,
    onToggle: () => {}
  };

  panel = React.createRef();

  handleToggle = e => {
    const { onToggle } = this.props;
    const { isOpen } = this.state;
    onToggle(e);
    this.setState({ isOpen: !isOpen, isAnimating: true });
  };

  animateOpen = () => {
    const { current: panel } = this.panel;
    const { animationTiming } = this.props;

    if (!animationTiming) {
      this.setState({ isAnimating: false });
      return;
    }

    const rect = panel.getBoundingClientRect();

    if (!this.styleTag) {
      this.styleTag = injectStyleTag();
    }

    setStyle(
      this.styleTag,
      `
      @keyframes expandOpenAnimation {
        0% { opacity: 0; height: 0; }
        100% { opacity: 1; height: ${rect.height}px; }
      }

      .cauldron-expand-open {
        will-change: opacity, height;
        overflow: hidden;
        animation: expandOpenAnimation ease-in-out ${animationTiming}ms forwards;
      }
    `
    );

    this.setState({ animationClass: 'cauldron-expand-open' }, () => {
      setTimeout(() => {
        this.setState({ animationClass: '', isAnimating: false });
        setStyle(this.styleTag, '');
      }, animationTiming);
    });
  };

  animateClose = () => {
    const { current: panel } = this.panel;
    const { animationTiming } = this.props;
    const { styleTag } = this;

    if (!animationTiming) {
      this.setState({ isAnimating: false });
      return;
    }

    const rect = panel.getBoundingClientRect();
    setStyle(
      styleTag,
      `
      @keyframes collapseCloseAnimation {
        0% { opacity: 1; height: ${rect.height}px; }
        100% { opacity: 0; height: 0; }
      }

      .cauldron-collapse-close {
        will-change: opacity, height;
        overflow: hidden;
        animation: collapseCloseAnimation ease-in-out ${animationTiming}ms forwards;
      }
    `
    );

    this.setState({ animationClass: 'cauldron-collapse-close' }, () => {
      setTimeout(() => {
        this.setState({ animationClass: '', isAnimating: false });
        setStyle(styleTag, '');
      }, animationTiming);
    });
  };

  componentWillUnmount() {
    const { styleTag } = this;
    if (styleTag) {
      removeStyleTag(styleTag);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.state;
    if (prevState.isOpen !== isOpen && isOpen) {
      this.animateOpen();
    } else if (prevState.isOpen !== isOpen && !isOpen) {
      this.animateClose();
    }
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      children,
      animationTiming,
      className,
      onToggle,
      ...other
    } = this.props;
    /* eslint-enable no-unused-vars */
    const { isOpen, isAnimating, animationClass } = this.state;
    const trigger = React.Children.toArray(children).find(
      child => child.type === PanelTrigger
    );
    const panelElements = React.Children.toArray(children).filter(
      child => typeof child === 'string' || child.type !== PanelTrigger
    );

    return (
      <React.Fragment>
        {trigger &&
          React.cloneElement(trigger, {
            open: isOpen,
            onClick: this.handleToggle
          })}
        <div
          {...other}
          className={classnames(animationClass, className, {
            'dqpl-hidden': !isOpen && !isAnimating
          })}
          ref={this.panel}
        >
          {panelElements}
        </div>
      </React.Fragment>
    );
  }
}
