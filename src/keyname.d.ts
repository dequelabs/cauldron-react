declare module 'keyname' {
  type KeyName =
    | 'backspace'
    | 'tab'
    | 'enter'
    | 'shift'
    | 'ctrl'
    | 'alt'
    | 'capslock'
    | 'esc'
    | 'space'
    | 'pageup'
    | 'pagedown'
    | 'end'
    | 'home'
    | 'left'
    | 'up'
    | 'right'
    | 'down'
    | 'ins'
    | 'del'
    | 'meta'
    | 'meta';

  namespace keyname {

  }

  export = keyname;

  function keyname(n: number): KeyName;
}
