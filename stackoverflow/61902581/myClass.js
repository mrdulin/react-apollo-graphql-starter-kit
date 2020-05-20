class myClass {
  functionOne() {
    setInterval(() => {
      const age = 10;
      try {
        const userName = 'John Smith';
        console.log(`Name: ${userName}, age: ${age}`);
      } catch (error) {
        console.error('Error', error);
      }
    }, 5000);
  }
}

module.exports = new myClass();
