# YAML Replacement action

This action replaces specific value in all Helm Chart YAML files in an array of folders. 

## Inputs

### `filePath`

**Required** Path to the YAML you want to edit

### `keyValueStr`

**Required** Keys you want to edit, for example:
`global.image.name=test,global.image.tag=v1`


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
uses: grasshopper-labs/yaml-replacement-action@v2
with:
  filePath: '/path/setting.yaml'
  keyValueStr: 'global.image.name=test,global.image.tag=v1'
```