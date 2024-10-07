const fs = require('fs').promises;
const yaml = require('js-yaml');

const main = async (filePath, keyValueStr) => {
  if (!filePath || !keyValueStr) {
    throw new Error('Both "filePath" and "keyValueStr" must be provided.');
  }
  console.log(`Path is ${filePath}, values to update: ${keyValuePairs}`);
  const keyValuePairs = keyValueStr.split(',').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    const keys = key.split('.');
    let current = acc;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        current[k] = value === 'true' ? true : value === 'false' ? false : value;
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    });
    return acc;
  }, {});

  try {
    // Load the YAML file
    const fileContents = await fs.readFile(filePath, 'utf8');
    let yamlData = yaml.load(fileContents);

    // Merge the updated key-value pairs into the YAML data
    function mergeDeep(target, source) {
      for (const key in source) {
        if (source[key] instanceof Object && key in target) {
          Object.assign(source[key], mergeDeep(target[key], source[key]));
        }
      }
      return { ...target, ...source };
    }

    const updatedYamlData = mergeDeep(yamlData, keyValuePairs);

    // Save the updated YAML back to the file
    const newYaml = yaml.dump(updatedYamlData);
    await fs.writeFile(filePath, newYaml, 'utf8');
    console.log('YAML file updated successfully!');
  } catch (e) {
    console.error(`Error processing YAML file: ${e}`);
  }
}

module.exports = { main };
