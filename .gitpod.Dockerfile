FROM gitpod/workspace-full

# Install custom tools, runtime, etc.
# install-packages is a wrapper for `apt` that helps skip a few commands in the docker env.
RUN npm i @cloudflare/wrangler -g

# Apply user-specific settings