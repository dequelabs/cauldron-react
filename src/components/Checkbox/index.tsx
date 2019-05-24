import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

const noop = () => {};

// Until ts3.5 is out of beta...
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface CheckboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id: string;
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  checkboxRef?: (ref: HTMLInputElement | null) => void;
}

interface CheckboxState {
  checked: boolean;
  focused: boolean;
}

export default class Checkbox extends React.Component<
  CheckboxProps,
  CheckboxState
> {
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
    disabled: false,
    onChange: noop,
    checkboxRef: noop
  };

  public readonly state: CheckboxState;

  private checkbox: HTMLInputElement | null = null;

  constructor(props: CheckboxProps) {
    super(props);
    this.state = { checked: this.props.checked || false, focused: false };
    this.toggleFocus = this.toggleFocus.bind(this);
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);
  }

  public componentDidUpdate(prevProps: CheckboxProps) {
    const checked = this.props.checked || false;

    if (checked !== prevProps.checked) {
      this.setState({ checked });
    }
  }

  private toggleFocus() {
    this.setState({ focused: !this.state.focused });
  }

  private onCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = !this.state.checked;
    this.setState({ checked });
    if (this.props.onChange) {
      this.props.onChange(e, checked);
    }
  }

  private onOverlayClick() {
    if (!this.checkbox) {
      return;
    }
    this.checkbox.click();
    this.checkbox.focus();
  }

  render() {
    const { checked, focused } = this.state;
    // disabling no-unused-vars below to prevent specific
    // props from being passed through to the wrapper
    const {
      id,
      value,
      name,
      label,
      disabled,
      className,
      // eslint-disable-next-line no-unused-vars
      onChange,
      checkboxRef = noop,
      ...others
    } = this.props;

    return (
      <div
        className={classNames('dqpl-checkbox-wrap dqpl-flexr', className)}
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
          className={classNames('dqpl-checkbox dqpl-overlay-checkbox fa', {
            'fa-square-o': !checked,
            'fa-check-square': checked,
            'dqpl-checkbox-disabled': disabled,
            'dqpl-checkbox-focused': focused
          })}
          onClick={this.onOverlayClick}
        />
        <label
          className={classNames('dqpl-label', {
            'dqpl-label-disabled': disabled
          })}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    );
  }
}
