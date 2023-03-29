const { exec } = require('child_process');
const {
  createConversation, addMessage,
  submitConversation,
} = require('bens_gpt');
const fs = require('fs');
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

const createModificationConversation = (instructions) => {
  return createConversation(
    {modelParams: {temperature: 0}},
    [{role: 'system', content: `
      Modify the following file according to these instructions: ${instructions}
      Don't make any changes to the file except those strictly required to follow the instructions
      `
    }]
  );
};

// --------------------------------------------------------
// Execution
// --------------------------------------------------------

const modifyFile = (fileName, instructions) => {
  let modificationPrompt = createModificationConversation(instructions);
  const fileContents = fs.readFileSync(fileName, 'utf-8');
  modificationPrompt = addMessage(modificationPrompt, {role: 'user', content: fileContents});
  console.log(modificationPrompt);

  submitConversation(modificationPrompt, gptAPIKey)
    .then(({message, tokens, finishReason}) => {
      console.log(message);
      fs.writeFileSync(fileName, message.content);
    });
}

modifyFile(process.argv[2], process.argv[3]);

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

