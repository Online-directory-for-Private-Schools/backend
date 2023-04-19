#!/bin/bash

yarn typeorm migration:generate src/db/migrations/$1 -d src/data-source.ts
