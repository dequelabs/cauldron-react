export const injectStyleTag = () => {
  const style = document.createElement('style');
  document.head.appendChild(style);
  return style;
};

export const setStyle = (tag, cssString) => {
  tag.textContent = cssString;
};

export const removeStyleTag = tag => {
  document.head.removeChild(tag);
};
