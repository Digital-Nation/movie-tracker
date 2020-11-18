const sleep = (duration = 100) => new Promise(resolve => setTimeout(resolve, duration));

module.exports = {
  sleep,
};
