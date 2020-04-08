export async function doStuff() {
  try {
    const granted = await navigator.storage.persist();
    if (granted) {
      console.log('Storage is now going to be persistent...', granted);
    }
  } catch (error) {
    const errorMessage = `Client did not allow storage to be persistent..${error.message}`;
    throw new Error(errorMessage);
  }
}
