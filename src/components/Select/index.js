import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keyname from 'keyname';
import rndid from '../../utils/rndid';
import { search, shouldSearch } from './utils';

export default class Select extends Component {
  static propTypes = {
    // ensure options is an array of objects with at least a "value" property
    options: PropTypes.arrayOf(
      (options, key, componentName, location, propFullName) => {
        const option = options[key];
        if (!option.value) {
          return new Error(
            `Invalid prop ${propFullName} supplied to ${componentName}`
          );
        }
      }
    ).isRequired,
    label: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    selectedId: PropTypes.string.isRequired,
    className: PropTypes.string,
    onKeyDown: PropTypes.func,
    required: PropTypes.bool,
    onSelect: PropTypes.func,
    value: PropTypes.string
  };

  static defaultProps = {
    className: '',
    required: false,
    onKeyDown: () => {},
    onSelect: () => {},
    value: null
  };

  state = { expanded: false };

  constructor() {
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.focusSelect = this.focusSelect.bind(this);
  }

  componentDidMount() {
    const { value, options } = this.props;

    if (!value) {
      return;
    }

    this.updateValue(options, value);
  }

  componentDidUpdate(prevProps) {
    const { value, options, onSelect } = this.props;

    if (value !== prevProps.value) {
      this.updateValue(options, value, onSelect);
    }
  }

  updateValue(options, value, onSelect) {
    const activeIndex = options.findIndex(o => o.value === value);

    if (activeIndex === -1) {
      return;
    }

    this.setState({
      activeIndex,
      selectedIndex: activeIndex
    });

    if (onSelect) {
      onSelect(options[activeIndex]);
    }
  }

  render() {
    const { expanded, activeIndex, selectedIndex } = this.state;
    const {
      className,
      label,
      required,
      selectedId,
      listId,
      options,
      onSelect,
      ...other
    } = this.props;
    const hasActiveOption = typeof activeIndex !== 'undefined';
    const active = options[activeIndex];
    const pseudoVal =
      hasActiveOption && active && (active.label || active.value);
    const labelId = rndid();
    const valueId = rndid();

    const opts = options.map((option, i) => {
      const { value, label, disabled } = option;
      // we don't need key events here because focus stays on the combobox element
      /* eslint-disable jsx-a11y/click-events-have-key-events */
      return (
        <li
          key={`${selectedId}-${i}`}
          className={classNames('dqpl-option', {
            'dqpl-option-active': hasActiveOption ? activeIndex === i : i === 0
          })}
          role="option"
          aria-selected={selectedIndex === i}
          aria-disabled={disabled}
          id={activeIndex === i ? selectedId : undefined}
          onClick={() => {
            if (disabled) {
              return;
            }
            this.setState({
              activeIndex: i,
              selectedIndex: i,
              expanded: false
            });
            onSelect(option);
            this.focusSelect();
          }}
        >
          {label || value}
        </li>
      );
    });
    // to make the "dqpl-label" div behave like a native label,
    // here we add a click listener which focuses the combobox
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className="dqpl-field-wrap">
        <div className="dqpl-label" id={labelId} onClick={this.focusSelect}>
          {label}
        </div>
        <div className="dqpl-select">
          <div
            {...other}
            className={classNames('dqpl-combobox', className)}
            tabIndex={0}
            role="combobox"
            aria-autocomplete="none"
            aria-expanded={expanded}
            aria-required={required}
            aria-labelledby={`${labelId} ${valueId}`}
            aria-controls={listId}
            aria-activedescendant={hasActiveOption ? selectedId : ''}
            onKeyDown={this.onKeyDown}
            onClick={this.onClick}
            ref={select => (this.select = select)}
          >
            <div
              role="textbox"
              aria-readonly={true}
              className="dqpl-pseudo-value"
              id={valueId}
            >
              {pseudoVal}
            </div>
          </div>
          <ul
            id={listId}
            role="listbox"
            className={classNames('dqpl-listbox', {
              'dqpl-listbox-show': expanded
            })}
          >
            {opts}
          </ul>
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/click-events-have-key-events jsx-a11y/no-static-element-interactions */
  }

  findAdjacentEnabledOption(dir) {
    const { options } = this.props;
    const { activeIndex = 0 } = this.state;
    const d = dir === 'up' ? -1 : 1;
    let adjacentIndex,
      i = activeIndex + d;

    while (options[i] && typeof adjacentIndex === 'undefined') {
      if (!options[i].disabled) {
        adjacentIndex = i;
      }

      i += d;
    }

    return adjacentIndex;
  }

  onKeyDown(e) {
    const { options } = this.props;
    const { expanded, activeIndex } = this.state;
    const { onSelect } = this.props;
    const { which } = e;
    const key = keyname(which);

    switch (key) {
      case 'down': {
        e.preventDefault();
        const prev = expanded && this.findAdjacentEnabledOption('down');

        if (!expanded) {
          this.setState({ expanded: true });
        } else if (typeof prev !== 'undefined') {
          this.setState({
            activeIndex: prev
          });
        }

        break;
      }

      case 'up': {
        if (!expanded) {
          return;
        }
        e.preventDefault();
        const next = this.findAdjacentEnabledOption('up');

        if (typeof next !== 'undefined') {
          this.setState({
            activeIndex: next
          });
        }

        break;
      }

      case 'esc':
      case 'tab':
        if (expanded) {
          this.onClose();
        }

        break;

      case 'enter':
      case 'space':
        e.preventDefault();

        if (expanded) {
          this.setState({
            selectedIndex: activeIndex,
            expanded: false
          });
          onSelect(options[activeIndex]);
        } else if (key === 'space') {
          this.onClick();
        }

        break;

      default:
        // for letters/numbers, jump to the first matching option (like native <select />s)
        if (expanded && shouldSearch(which)) {
          const jumpTo = search(key, options);

          if (jumpTo >= 0 && jumpTo !== activeIndex) {
            this.setState({ activeIndex: jumpTo });
          }
        }
    }

    this.props.onKeyDown(e);
  }

  onClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  onClose() {
    this.setState({
      expanded: false,
      activeIndex: this.state.selectedIndex
    });
  }

  focusSelect() {
    this.select.focus();
  }
}
