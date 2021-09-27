const EventEmitter = require("events").EventEmitter;
const eventEmitter = new EventEmitter();

module.exports = {
  createAlertWatcher(name) {
    return eventEmitter.once(name, () => {
      console.log(`${name} listener is open`)
    });
  },
  removeListener(name) {
    return eventEmitter.removeListener(name, () =>
      console.log(`${name} listener is close`)
    );
  },
  getMaxListeners() {
    return eventEmitter.getMaxListeners();
  },
};
