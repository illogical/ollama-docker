# ollama-docker
A Docker configuration for building an Ollama server exposed to a Tailnet.
# Usage
1. **Set up your Tailscale Auth Key**

   - Obtain a Tailscale [auth key](https://login.tailscale.com/admin/settings/keys).
   - Create a `.env` file in this directory with:
     ```
     TS_AUTHKEY=tskey-xxxxxxxxxxxxxxxx
     OLLAMA_HOSTNAME=ollama-server
     ```
   - Replace `tskey-xxxxxxxxxxxxxxxx` with your actual Tailscale auth key.
   - Replace `ollama-server` with the desired hostname for your Ollama server.
2. **Build the Docker image**
   ```bash
   docker-compose build
   ```  
3. **Run the Docker container**
   ```bash
   docker-compose up -d
   ```
4. **Access the Ollama server**
   - Open your web browser and navigate to `http://ollama-server:11434` or use the hostname you specified in the `.env` file.
5. **Stop the Docker container**
   ```bash
   docker-compose down
   ```