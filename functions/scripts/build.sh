#!/bin/bash
rm -rf lib
echo $1
tsc $1
mkdir lib/schemas
cp -R src/schemas/* lib/schemas