import { store } from 'react-notifications-component';

const addNotification = (title, message, type) => {
  const options = {
    title,
    message,
    type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
  };

  store.addNotification({
    ...options,
    dismiss: {
      duration: 5000,
      onScreen: true,
      pauseOnHover: true,
    },
  });
};

export default addNotification;
