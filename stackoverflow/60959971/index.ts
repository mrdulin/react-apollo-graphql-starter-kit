export function main() {
  console.log(window.location.search);
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('productId');
}
