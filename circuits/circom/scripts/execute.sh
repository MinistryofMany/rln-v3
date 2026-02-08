#!/bin/bash

echo "----- Remove build folder -----"
./scripts/removeBuildFolder.sh

echo "----- RLN -----"
echo "----- RLN Groth16 -----"
./scripts/execute-groth16.sh
echo "----- RLN Plonk -----"
./scripts/execute-plonk.sh
echo "----- RLN Fflonk -----"
./scripts/execute-fflonk.sh


