
const {exec} = require('child_process');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function waitForYes(question, data) {
  return new Promise((resolve, reject) => {
    readline.question(question, (answer) => {
      if (
        answer.toLowerCase() === 'yes' ||
        answer.toLowerCase() === 'y'
      ) {
        resolve(data);
      } else {
        reject();
      }
      readline.close();
    });
  });
}

const asyncExec = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      resolve({stdout, stderr, err});
    });
  });
}

// find a regex inside a string
const getRegex = (str) => {
  const regex = /\/(.*?)\//g;
  const matches = str.match(regex);

  if (matches) {
    const regexStrings = matches.map(match => {
      return match.slice(1,-1);
    });
    return regexStrings[0];
  } else {
    return '';
  }
}

module.exports = {
  asyncExec,
  getRegex,
  readline,
  waitForYes,
}
