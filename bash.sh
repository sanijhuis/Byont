#!/bin/bash

mkdir ScannerResults
myth analyze smart_contract.sol 2>&1 | tee ScannerResults/scanner.json
