const core = require('@actions/core');
const { main } = require('./replace_value_and_commit');

(() => {
  try {
    const filePath = core.getInput('filePath');
    const keyValueStr = core.getInput('keyValueStr');
    main(filePath, keyValueStr);
  } catch (error) {
    core.setFailed(error.message);
  }
})();

