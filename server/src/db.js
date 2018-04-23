const fakeDB = {
  books: [
    {
      id: '1',
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
      messages: [
        {
          id: '1',
          text: 'baseball is life'
        }
      ]
    },
    {
      id: '2',
      title: 'Jurassic Park',
      author: 'Michael Crichton',
      messages: []
    }
  ]
};

exports.fakeDB = fakeDB;
