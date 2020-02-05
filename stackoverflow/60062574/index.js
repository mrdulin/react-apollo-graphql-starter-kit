import { handleError } from './errorHandler';

function main() {
  navigator.geolocation.getCurrentPosition(
    () => {
      console.log('success');
    },
    (err) => {
      handleError(err);
    },
  );
}

export { main };
