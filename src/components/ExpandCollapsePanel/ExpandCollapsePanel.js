import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PanelTrigger from './PanelTrigger';
import { appendStyle, removeStyle } from '../../utils/stylesheets';

export default class ExpandCollapsePanel extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    animationTiming: PropTypes.number,
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

    const rect = panel.getBoundingClientRect();
    const style = appendStyle(`
      @keyframes expandOpenAnimation {
        0% { opacity: 0; height: 0; }
        100% { opacity: 1; height: ${rect.height}px; }
      }

      .cauldron-expand-open {
        will-change: opacity, height;
        overflow: hidden;
        animation: expandOpenAnimation ease-in-out ${animationTiming}ms forwards;
      }
    `);

    this.setState({ animationClass: 'cauldron-expand-open' }, () => {
      setTimeout(() => {
        this.setState({ animationClass: '', isAnimating: false });
        removeStyle(style);
      }, animationTiming);
    });
  };

  animateClose = () => {
    const { current: panel } = this.panel;
    const { animationTiming } = this.props;

    const rect = panel.getBoundingClientRect();
    const style = appendStyle(`
      @keyframes collapseCloseAnimation {
        0% { opacity: 1; height: ${rect.height}px; }
        100% { opacity: 0; height: 0; }
      }

      .cauldron-collapse-close {
        will-change: opacity, height;
        overflow: hidden;
        animation: collapseCloseAnimation ease-in-out ${animationTiming}ms forwards;
      }
    `);

    this.setState({ animationClass: 'cauldron-collapse-close' }, () => {
      setTimeout(() => {
        this.setState({ animationClass: '', isAnimating: false });
        removeStyle(style);
      }, animationTiming);
    });
  };

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
    const panelElements = React.Children.toArray(children).find(
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
