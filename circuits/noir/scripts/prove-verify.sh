#!/bin/bash

# Variable to store the name of the circuit
CIRCUIT=rln

# In case there is a circuit name as input
if [ "$1" ]; then
    CIRCUIT=$1
fi

# Compile the circuit and generate witness
nargo execute

# Generate proof
bb prove -b ./target/${CIRCUIT}.json -w ./target/${CIRCUIT}.gz -o ./target

# Generate the verification key and save to ./target/vk
bb write_vk -b ./target/${CIRCUIT}.json -o ./target

# Verify the proof
bb verify -k ./target/vk -p ./target/proof