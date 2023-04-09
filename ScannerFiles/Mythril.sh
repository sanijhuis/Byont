#!/bin/bash

mkdir ScannerResults
myth analyze $1 2>&1 | tee ScannerResults/scanner.txt