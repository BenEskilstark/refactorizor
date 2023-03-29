const { exec } = require('child_process');
const {
  createConversation, addMessage,
  submitConversation,
} = require('bens_gpt');
const {gptAPIKey} = require('./.secrets');

// --------------------------------------------------------
// Utils
// --------------------------------------------------------

const asyncExec = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      resolve({stdout, stderr, err});
    });
  });
}

// --------------------------------------------------------
// Conversations
// --------------------------------------------------------

const grepConversation = createConversation(
  {modelParams: {temperature: 0}},
  [{role: 'system', content: 'You output regular expressions'}]
);

// --------------------------------------------------------
// Execution
// --------------------------------------------------------

// asyncExec('cat script.js')
//   .then(({stdout}) => {
//     return asyncExec(`echo '${stdout}' > foo`);
//   })
//   .then(({stdout, err, stderr}) => {
//     if (err) console.error(err);
//
//     console.log(stdout);
//     console.log(stderr);
//   });

