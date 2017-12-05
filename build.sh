#!/usr/bin/env bash
node node_modules/antlr4-cli/bin/antlr4.js -Dlanguage=JavaScript -visitor -o build/interpreter src/interpreter/Python.g4