import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * <SkipLink target={'#foo'} />
 */
export default class SkipLink extends Component {
  constructor() {
    super();

    this.state = { currentClass: '' };

    this.onClick = this.onClick.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  render() {
    const { currentClass } = this.state;
    const { target, skipText, targetText } = this.props;

    return (
      <nav className={classNames('dqpl-skip-container', currentClass)}>
        <a
          href={target}
          className="dqpl-skip-link"
          onClick={this.onClick}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        >
          <span className="dqpl-skip-one">{skipText}</span>
          <span className="dqpl-skip-two">{targetText}</span>
        </a>
      </nav>
    );
  }

  onClick() {
    const element = document.querySelector(this.props.target);

    if (element) {
      element.tabIndex = -1;
      element.focus();
    }
  }

  onFocus() {
    this.setState({ currentClass: 'dqpl-skip-container-active' });

    setTimeout(() => {
      this.setState({
        currentClass: 'dqpl-skip-container-active dqpl-skip-fade'
      });
    });
  }

  onBlur() {
    this.setState({ currentClass: 'dqpl-skip-container-active' });

    setTimeout(() => {
      this.setState({ currentClass: '' });
    });
  }
}

SkipLink.propTypes = {
  // enforce a valid id hash string (example: '#foo')
  target: (props, propName, componentName) => {
    const value = props[propName];
    if (!value || typeof value !== 'string' || value[0] !== '#') {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName} (must be string starting with "#")`
      );
    }
  },
  skipText: PropTypes.string,
  targetText: PropTypes.string
};

SkipLink.defaultProps = {
  skipText: 'Skip to',
  targetText: 'Main Content'
};
