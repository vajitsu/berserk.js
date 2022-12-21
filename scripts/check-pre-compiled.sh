#!/bin/bash

set -e

cd packages/berserk

pnpm run ncc-compiled

cd ../../

cd packages/berserk-discord

pnpm run ncc-compiled

cd ../..

# Make sure to exit with 1 if there are changes after running ncc-compiled
# step to ensure we get any changes committed

if [[ ! -z $(git status -s) ]];then
  echo "Detected changes"
  git diff -a --stat
  exit 1
fi