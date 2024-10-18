#!/bin/bash

# Generate a new wallet using cast
echo "Generating a new wallet..."
wallet_output=$(cast wallet new)

# Extract private key and address from the output
private_key=$(echo "$wallet_output" | grep "Private key:" | awk '{print $3}')
address=$(echo "$wallet_output" | grep "Address:" | awk '{print $2}')

# Create or update the .env file
echo "Creating/updating .env file..."
cat << EOF > .env
PRIVATE_KEY=$private_key
ADDRESS=$address
EOF

echo "Setup complete. New wallet details have been added to .env file."
echo "Address: $address"

# Prompt user to send ETH to the new address
echo ""
echo "IMPORTANT: Please send 0.01 ETH to the address above to fund your new wallet."
echo "This is necessary for deploying contracts and interacting with the blockchain."