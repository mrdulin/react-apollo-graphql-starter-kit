export default class EventSourceSetup {
  eventSource;
  constructor() {
    let eventSource = new EventSource('http://localhost');
    this.eventSource = eventSource;

    eventSource.addEventListener('loading', function(event) {
      console.log('loading');
    });

    eventSource.addEventListener('loaded', function(event) {
      console.log('loaded');
    });

    eventSource.addEventListener('error', function(event) {
      console.log('error');
    });

    eventSource.onerror = (error) => {
      console.error('EventSource failed: ', error);
    };
  }
}
