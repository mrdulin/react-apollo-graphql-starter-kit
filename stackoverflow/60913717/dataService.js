export function getData() {
  return fetch('/api/v2/user').then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return {};
    }
  });
}
