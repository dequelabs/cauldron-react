import { appendStyle, removeStyle } from 'src/utils/stylesheets';

afterEach(() => {
  document.head.innerHTML = '';
});

test('should append cssString to style tag in head', () => {
  const cssString = `
    .foo {
      background: #000;
    }
  `;
  const tag = appendStyle(cssString);

  expect(tag.textContent).toBe(cssString);
  expect(document.head.querySelector('style')).toBe(tag);
});

test('remove style tag from head', () => {
  const tag = document.createElement('style');
  tag.textContent = '.foo { background: #000; }';
  document.head.appendChild(tag);

  removeStyle(tag);
  expect(document.head.querySelectorAll('style').length).toBe(0);
});
