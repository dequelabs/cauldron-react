import * as React from 'react';

type RefCallback = (ref: any) => void;

interface WorkspaceProps {
  children: React.ReactNode;
  workspaceRef?: RefCallback;
  layoutRef?: RefCallback;
  noSideBar?: boolean;
}

export const Workspace: React.ComponentType<WorkspaceProps>;

interface LayoutProps {
  children: React.ReactNode;
  layoutRef?: RefCallback;
}

export const Layout: React.ComponentType<LayoutProps>;

interface MainProps {
  children: React.ReactNode;
  mainRef?: RefCallback;
}

export const Main: React.ComponentType<MainProps>;

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  // TODO: allowed "types" should be defined here (intellisense, etc)
  type: string;
}

export const Icon: React.ComponentType<IconProps>;

interface OffscreenProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Offscreen: React.ComponentType<OffscreenProps>;

interface ScrimProps {
  show: boolean;
}

export const Scrim: React.ComponentType<ScrimProps>;

interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  menuItemRef?: RefCallback;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLLIElement>) => void;
  autoClickLink?: boolean;
}

export const MenuItem: React.ComponentType<MenuItemProps>;

interface TopBarProps {
  children: React.ReactNode;
  className?: string;
  hasTrigger?: boolean;
}

export const TopBar: React.ComponentType<TopBarProps>;

interface TopBarTriggerProps {
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLLIElement>) => void;
  menuItemRef?: RefCallback;
}

export const TopBarTrigger: React.ComponentType<TopBarTriggerProps>;

interface SidebarProps {
  children: React.ReactNode;
  onDismiss: () => void;
  className?: string;
  show?: boolean;
}

export const Sidebar: React.ComponentType<SidebarProps>;

interface AlertProps {
  className?: string;
  children: React.ReactNode;
  show?: boolean;
  contentRef?: RefCallback;
  alertRef?: RefCallback;
  onClose?: () => void;
  forceAction?: boolean;
}

export const Alert: React.ComponentType<AlertProps>;

interface AlertActionsProps {
  children: React.ReactNode;
}

export const AlertActions: React.ComponentType<AlertActionsProps>;

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
  modalRef?: RefCallback;
  onClose?: () => void;
  forceAction?: boolean;
  heading: {
    text: string;
    level?: number;
  };
  closeButtonText?: string;
}

export const Modal: React.ComponentType<ModalProps>;

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ModalContent: React.ComponentType<ModalContentProps>;

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ModalFooter: React.ComponentType<ModalFooterProps>;

interface SkipLinkProps {
  target: string;
  skipText: string;
  targetText: string;
}

export const SkipLink: React.ComponentType<SkipLinkProps>;

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'error' | 'link';
  children: React.ReactNode;
  className?: string;
  buttonRef?: RefCallback;
}

export const Button: React.ComponentType<ButtonProps>;

interface FirstTimePointOutProps {
  headerId: string;
  children: React.ReactNode;
  ftpRef?: RefCallback;
  noArrow?: boolean;
  onClose?: () => void;
  dismissText?: string;
}

export const FirstTimePointOut: React.ComponentType<FirstTimePointOutProps>;

interface ToastProps {
  children: React.ReactNode;
  type: 'confirmation' | 'caution' | 'action-needed';
  onDismiss?: () => void;
  autoHide?: number;
  dismissText?: string;
  toastRef?: RefCallback;
  show?: boolean;
}

export const Toast: React.ComponentType<ToastProps>;

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const Link: React.ComponentType<LinkProps>;

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export const Loader: React.ComponentType<LoaderProps>;

interface OptionsMenuRenderTriggerProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  show: boolean;
  ref: RefCallback;
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
}

interface OptionsMenuProps extends OptionsMenuAlignmentProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  menuRef?: RefCallback;
  trigger: (props: OptionsMenuRenderTriggerProps) => React.ReactNode;
  onClose?: () => void;
  onSelect?: (e: React.MouseEvent<HTMLElement>) => void;
  closeOnSelect?: boolean;
  show?: boolean;
}

export const OptionsMenu: React.ComponentType<OptionsMenuProps>;

interface OptionsMenuItemProps
  extends Pick<
      React.HTMLAttributes<HTMLLIElement>,
      Exclude<keyof React.HTMLAttributes<HTMLLIElement>, 'onSelect'>
    > {
  disabled?: boolean;
  className?: string;
  onSelect?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const OptionsMenuItem: React.ComponentType<OptionsMenuItemProps>;

interface OptionsMenuTriggerProps {
  ref?: RefCallback;
  className?: string;
}

export const OptionsMenuTrigger: React.ComponentType<OptionsMenuTriggerProps>;

interface OptionsMenuAlignmentProps {
  align?: 'left' | 'right';
}

interface OptionsMenuWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    OptionsMenuAlignmentProps {
  className?: string;
  children: React.ReactNode;
}

export const OptionsMenuWrapper: React.ComponentType<OptionsMenuWrapperProps>;

interface SelectOption {
  value: string;
  disabled?: boolean;
  label?: React.ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  label: string;
  listId: string;
  selectedId: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onSelect?: (value: any) => void;
  required?: boolean;
  value?: string;
}

export const Select: React.ComponentType<SelectProps>;

interface RadioItem {
  value: string;
  id: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  radios: RadioItem[];
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (radio: RadioItem, input: HTMLElement) => void;
}

export const RadioGroup: React.ComponentType<RadioGroupProps>;

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>, checked: boolean) => void;
  checkboxRef?: RefCallback;
}

export const Checkbox: React.ComponentType<CheckboxProps>;

export class AriaIsolate {
  public element: HTMLElement;
  public affectedElements: HTMLElement[];
  constructor(el: HTMLElement);
  activate(): void;
  deactivate(): void;
}

export const focusableSelector: string;

export const Card: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export const CardHeader: React.ComponentType<
  React.HTMLAttributes<HTMLDivElement>
>;
export const CardContent: React.ComponentType<
  React.HTMLAttributes<HTMLDivElement>
>;
export const CardFooter: React.ComponentType<
  React.HTMLAttributes<HTMLDivElement>
>;

interface TextFieldProps {
  label: React.ReactNode;
  id?: string;
  error?: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldRef?: RefCallback;
  required?: boolean;
  requiredText?: string;
  mulitline?: boolean;
  'aria-describedby'?: string;
}

export const TextField: React.ComponentType<TextFieldProps>;

interface ClickOutsideListenerProps {
  children: React.ReactNode;
  onClickOutside: (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => void;
  mouseEvent?: 'mousedown' | 'click' | 'mouseup' | false;
  touchEvent?: 'touchstart' | 'touchend' | false;
}

export const ClickOutsideListener: React.ComponentType<
  ClickOutsideListenerProps
>;

interface ExpandCollapsePanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animationTiming?: number | boolean;
  onToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ExpandCollapsePanel: React.ComponentType<ExpandCollapsePanelProps>;

interface PanelTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: ((props: { close: boolean }) => React.ReactNode) | React.ReactNode;
  open?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const PanelTrigger: React.ComponentType<PanelTriggerProps>;

interface TopBarMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  id: string;
  children: React.ReactNode;
}

export const TopBarMenu: React.ComponentType<TopBarMenuProps>;
