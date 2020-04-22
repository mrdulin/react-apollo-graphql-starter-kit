export function handleCopyIdToClipboard() {
  const el = document.querySelector('.class-name');
  const textContent = el ? el.textContent || '' : '';
  return navigator.clipboard.writeText(textContent);
}
