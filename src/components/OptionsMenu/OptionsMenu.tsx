import * as React from 'react';
import * as PropTypes from 'prop-types';

interface Props {
  children: React.ReactNode;
  id: string;
  onClose: () => void;
  show?: boolean;
}

interface State {
  itemIndex: number;
}

class OptionsMenu extends React.Component<Props> {
  public static displayName = 'OptionsMenu';

  public static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool
  };

  public readonly state: State = { itemIndex: 0 };

  private itemRefs: HTMLLIElement[] = [];

  public render() {
    const { children, id, show, ...other } = this.props;
    return (
      <ul
        {...other}
        className="dqpl-options-menu"
        aria-expanded={show}
        id={id}
        role="menu"
        onKeyDown={this.handleKeyDown}
      >
        {React.Children.map(children, (child, index) => (
          <li
            key={`${id}-${index}`}
            className="dqpl-options-menuitem"
            tabIndex={-1}
            role="menuitem"
            ref={(ref: HTMLLIElement) => {
              this.itemRefs[index] = ref;
            }}
            {...(child as any).props}
          />
        ))}
      </ul>
    );
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    const { itemIndex } = this.state;
    const { show } = this.props;

    if (!prevProps.show && show && this.itemRefs.length) {
      // handles opens
      this.itemRefs[0].focus();
    } else if (prevState.itemIndex !== itemIndex) {
      // handle up/down arrows
      this.itemRefs[itemIndex].focus();
    }
  }

  private handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const { which, target } = e;

    switch (which) {
      // up / down
      case 38:
      case 40: {
        const { itemIndex } = this.state;
        const itemCount = this.itemRefs.length;
        let newIndex = which === 38 ? itemIndex - 1 : itemIndex + 1;

        // circularity
        if (newIndex === -1) {
          newIndex = itemCount - 1;
        } else if (newIndex === itemCount) {
          newIndex = 0;
        }

        e.preventDefault();
        this.setState({
          itemIndex: newIndex
        });

        break;
      }
      // escape
      case 27:
        this.props.onClose();

        break;
      // enter / space
      case 13:
      case 32:
        e.preventDefault();
        (target as HTMLLIElement).click();

        break;
      // tab
      case 9:
        e.preventDefault();
        this.props.onClose();
    }
  };
}

export default OptionsMenu;
