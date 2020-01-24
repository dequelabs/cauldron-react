type RefCallback<T> = (ref: T | null) => void;
type Ref<T> = React.Ref<T> | RefCallback<T>;

declare module 'keyname' {
  function keyname(n: number): string;
  export = keyname;
}

declare module 'focusable' {
  function focusable(): string;
  export = focusable;
}
