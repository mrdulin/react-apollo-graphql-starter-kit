export function handleCopyIdToClipboard() {
  const el = document.querySelector('.class-name');
  const textContent = el ? el.textContent || '' : '';
  navigator.clipboard.writeText(textContent);
}
