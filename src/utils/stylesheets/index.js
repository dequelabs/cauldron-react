export const appendStyle = cssString => {
  const style = document.createElement('style');
  style.textContent = cssString;
  document.head.appendChild(style);
  return style;
};

export const removeStyle = tag => {
  document.head.removeChild(tag);
};
