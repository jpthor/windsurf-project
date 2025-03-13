#!/bin/bash

# Create the environment variables file
cat > js/vercel-env.js << EOL
// Vercel environment variables injection
window.ENV_VARS = {
    REACT_APP_GROK_API_KEY: '${REACT_APP_GROK_API_KEY}'
};
EOL

echo "Environment variables injected successfully"
