#!/bin/bash
mkdir ScannerResults
echo Enter the name of the solidity file:
read solidity_filename
myth analyze $solidity_filename 2>&1 | tee ScannerResults/scanner.txt
