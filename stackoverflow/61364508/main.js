import Cookies from 'js-cookie';

export function main(cookieName) {
  const fullObjectStr = Cookies.get(cookieName);
  console.log(fullObjectStr);
}
