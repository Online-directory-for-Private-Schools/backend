#!/bin/bash
yarn typeorm migration:revert -d src/data-source.ts
