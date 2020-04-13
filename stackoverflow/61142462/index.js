export function* authentication({ data }) {
  if (data.action === 'authentication') {
    localStorage.setItem('dualbits:access', data.access);
    localStorage.setItem('dualbits:refresh', data.refresh);
  }
  yield 'dispatch action';
}

export function main() {
  window.addEventListener('message', authentication, false);
}
