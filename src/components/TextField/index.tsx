import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import rndid from '../../utils/rndid';
import tokenList from '../../utils/token-list';

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: React.ReactNode;
  error?: React.ReactNode;
  defaultValue?: string;
  onChange: (
    value: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fieldRef: RefCallback<HTMLInputElement | HTMLTextAreaElement>;
  requiredText?: string;
  multiline?: boolean;
}

interface TextFieldState {
  value: string | number | string[] | undefined;
}

export default class TextField extends React.Component<
  TextFieldProps,
  TextFieldState
> {
  static defaultProps = {
    error: null,
    required: false,
    defaultValue: null,
    onChange: () => {},
    fieldRef: () => {},
    requiredText: 'Required',
    multiline: false
  };

  private inputId: string;
  private errorId: string;
  private input: HTMLInputElement | HTMLTextAreaElement | null;

  constructor(props: TextFieldProps) {
    super(props);
    this.inputId = this.props.id || rndid();
    this.errorId = rndid();
    this.state = {
      value:
        typeof this.props.value !== 'undefined'
          ? this.props.value
          : this.props.defaultValue || ''
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps: TextFieldProps) {
    const { value } = this.props;

    if (value === prevProps.value) {
      return;
    }

    this.setState({ value });
  }

  render() {
    const isRequired = !!this.props.required;
    // disabling `no-unused-vars` to prevent specific
    // props from being passed through to the input
    const {
      label,
      fieldRef,
      // eslint-disable-next-line no-unused-vars
      value,
      // eslint-disable-next-line no-unused-vars
      onChange,
      // eslint-disable-next-line no-unused-vars
      defaultValue,
      error = null,
      requiredText,
      multiline,
      'aria-describedby': ariaDescribedby,
      ...other
    } = this.props;
    // typescript can't infer the type so it's complaining about
    // textarea and input props being incompatible
    // we should probably fix this
    const Field: any = multiline ? 'textarea' : 'input';
    const inputProps = {
      'aria-describedby': error
        ? tokenList(this.errorId, ariaDescribedby)
        : ariaDescribedby
    };

    return (
      <div className="dqpl-field-wrap">
        <label
          className={classNames('dqpl-label', {
            'dqpl-required': isRequired,
            'dqpl-error': error
          })}
          htmlFor={this.inputId}
        >
          <span>{label}</span>
          {isRequired && (
            <span className="dqpl-required-text">{requiredText}</span>
          )}
        </label>
        <Field
          className={classNames({
            'dqpl-text-input': !multiline,
            'dqpl-textarea': multiline,
            'dqpl-error': error
          })}
          id={this.inputId}
          value={this.state.value}
          onChange={this.onChange}
          aria-invalid={!!error}
          ref={(input: HTMLInputElement | HTMLTextAreaElement | null) => {
            this.input = input;
            fieldRef(input);
          }}
          {...other}
          {...inputProps}
        />
        <div className="dqpl-error-wrap" id={this.errorId}>
          {error}
        </div>
      </div>
    );
  }

  onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.props.onChange(this.input?.value || '', e);
    if (typeof this.props.value !== 'undefined') {
      return;
    }

    this.setState({
      value: this.input?.value
    });
  }
}
