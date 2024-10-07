# YAML Replacement action

This action replaces specific value in all Helm Chart YAML files in an array of folders. 

## Inputs

### `folders`

**Required** Array of chart folders.

### `target-key`

**Required** The key of the value that needs to be replaced in the YAML file.

### `target-value`

**Required** The value for the key that needs to be replaced in the YAML file.

### `need-push`

If you need to push these changes, set `true`, default `false`

**Notice**
You need to supply your Personal Access Token (PAT) which allows repository access to the checkout action. For example:

```yml
      - name: Checkout repository
        uses: actions/checkout@v8
        with:
          fetch-depth: 0 
          token: ${{ secrets.MY_PERSONAL_ACCESS_TOKEN }}
```

## Example usage

```yaml
uses: grasshopper-labs/yaml-replacement-action@v1
with:
  filePath: '/path/setting.yaml'
  keyValueStr: 'global.image.name=test,global.image.tag=v1'
```