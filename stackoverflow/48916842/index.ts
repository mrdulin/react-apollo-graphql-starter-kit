export const funcA = (response) => {
  if (!response.ok) {
    return response.json().then((data) => {
      throw Error(data);
    });
  }
};
