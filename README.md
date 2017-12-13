# Scriptz
Configuration file based script runner

## Getting started (Code)
```bash
$ npm install --save scriptz
```

```javascript
const run = require('scriptz').run

run(configuration).subscribe(...) // Observable
```

## Getting started (CLI)
```bash
$ npm install -g scriptz
$ scriptz run --config config.yaml
```

Create a config file in yaml.

```yaml
options:
  retry_count: 3
  env:
    FOO: bar
start:
  name: Main
  flow: sequential
  steps:
    - name: Clean
      script: clean.sh
      arguments:
        - foo
      output_file: clean.log
      retry_count: 1
      env:
        FOO: Test
    - name: Install
      script: install.sh
      retry_count: 1
      output_file: install.log
```

See the full [documentation](./docs/README.md)
