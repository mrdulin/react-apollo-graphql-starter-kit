export const removeValuesFromTextAreaEvent = ({ removeValuesFromTextArea }) => (event, rows) => {
  event.preventDefault();
  removeValuesFromTextArea({ rowID: rows });
};
