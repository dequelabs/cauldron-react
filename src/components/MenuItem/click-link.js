export default function(target, item) {
  const link = target.tagName !== 'A' && item.querySelector('a');
  if (!link) {
    return;
  }

  link.click();
}
