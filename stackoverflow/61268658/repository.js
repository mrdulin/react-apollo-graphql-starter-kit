const repository = (container) => {
  const makeBooking = (user, booking) => {
    'make booking function called';
  };

  const generateTicket = (paid, booking) => {
    console.log('generate ticket function called');
  };

  const getOrderById = (orderId) => {
    console.log('get order by ID called');
  };

  const disconnect = () => {
    console.log('disconnect method called');
  };

  return {
    makeBooking,
    getOrderById,
    generateTicket,
    disconnect,
  };
};

module.exports = repository;
