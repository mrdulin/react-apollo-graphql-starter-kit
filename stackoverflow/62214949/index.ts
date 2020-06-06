import { client } from './client';

export function main() {
  const request = {};
  const meta = {};
  client.authenticate(request, meta, (error, response) => {
    if (!error) {
      console.log('REPLY FROM SERVER: ', response);
    } else {
      console.error(error);
    }
  });
}
