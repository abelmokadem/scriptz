# Documentation

The configuration exists of flows and steps. We start of by defining a
couple of options and the start flow.

```
options:
  retry_count: number     # (default: 0) Retry count if exit code > 0
  env: Object             # (default: {}) Additional environment variables
start:
  ...
```

The base options that are defined will be used for each step. All the
environment variables from the base options will be used, if it is set.
If it is also defined on the step level, then the object will be merged.

## Step configuration

```yaml
# Required values
name: string                # Label used to keep track of script
script: string              # Script location relative to where scriptz is being run
output_file: string         # Where to write logs / directory should exist

continue_on_error: boolean  # (default: false) # Continue even if exit code > 0
arguments: Array<String>    # (default: []) Additional arguments
cwd: string                 # (default: process.cwd()) CWD of the script
env: Object                 # (default: {}) Additional environment variables
retry_count: number         # (default: 0) Retry count if exit code > 0
```
