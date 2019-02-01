import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { RefCallback } from '../../types';

type OnChangeCallback = (
  e: React.ChangeEvent<HTMLInputElement>,
  checked: boolean
) => void;

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: OnChangeCallback;
  checkboxRef?: RefCallback;
}

interface CheckboxState {
  checked: boolean;
  focused: boolean;
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  public static displayName = 'Checkbox';

  public static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    checkboxRef: PropTypes.func
  };

  public static defaultProps = {
    checked: false,
    disabled: false
  };

  public readonly state: CheckboxState;

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked || false,
      focused: false
    };
  }

  private checkbox: HTMLElement | null = null;

  public render() {
    const { checked, focused } = this.state;
    const {
      id,
      value,
      name,
      label,
      disabled,
      className,
      onChange,
      checkboxRef = () => {},
      ...others
    } = this.props;

    return (
      <div
        className={cx('dqpl-checkbox-wrap dqpl-flexr', className)}
        {...others}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={this.onCheckboxClick}
          disabled={disabled}
          name={name}
          id={id}
          value={value}
          onFocus={this.toggleFocus}
          onBlur={this.toggleFocus}
          ref={checkbox => {
            this.checkbox = checkbox;
            checkboxRef(checkbox);
          }}
        />
        <div
          aria-hidden="true"
          className={cx('dqpl-checkbox dqpl-overlay-checkbox fa', {
            'fa-square-o': !checked,
            'fa-check-square': checked,
            'dqpl-checkbox-disabled': disabled,
            'dqpl-checkbox-focused': focused
          })}
          onClick={this.onOverlayClick}
        />
        <label
          className={cx('dqpl-label', {
            'dqpl-label-disabled': disabled
          })}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    );
  }

  public componentDidUpdate(prevProps: CheckboxProps) {
    const checked = !!this.props.checked;
    if (checked !== prevProps.checked) {
      this.setState({ checked });
    }
  }

  private toggleFocus = () => this.setState({ focused: !this.state.focused });

  private onCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = !this.state.checked;
    this.setState({ checked });
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(e, checked);
    }
  };

  private onOverlayClick = () => {
    const { checkbox } = this;
    if (!checkbox) {
      return;
    }

    checkbox.click();
    checkbox.focus();
  };
}

export default Checkbox;
