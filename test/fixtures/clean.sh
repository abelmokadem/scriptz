#!/usr/bin/env bash

set -e

ls -al
echo "Clean"
echo "Name: ${NAME}"
echo "Arguments: ${@}"

bash -e fixtures/test.sh

echo "After running sub-process"

exit 1
