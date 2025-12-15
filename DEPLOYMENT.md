# Deployment Guide: Digital Ocean

This guide outlines the steps to deploy your React application to a Digital Ocean Droplet using Docker.

## Prerequisites

-   A Digital Ocean account.
-   Access to a terminal (Command Line).
-   GitHub repository URL for your project.

## Step 1: Create a Droplet

1.  Log in to Digital Ocean.
2.  Click **Create** -> **Droplets**.
3.  Choose **Ubuntu** (LTS version, e.g., 24.04 or 22.04).
4.  Choose a plan (Basic, Regular with SSD is fine for this app).
5.  Choose a datacenter region close to your users.
6.  **Authentication**: Select **SSH Key** (recommended) or Password.
7.  Click **Create Droplet**.

## Step 2: SSH into your Droplet

Once the Droplet is created, copy its IP address.

```bash
ssh root@<DROPLET_IP_ADDRESS>
```

## Step 3: Install Docker

Run the following commands on your Droplet to install Docker:

```bash
# Update package index
apt update

# Install prerequisites
apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io

# Verify installation
docker --version
```

## Step 4: Clone the Repository

```bash
# Clone your repository
git clone https://github.com/Chan-electro/adgrades-main.git

# Navigate into the directory
cd adgrades-main
```

## Step 5: Build and Run the Container

Build the Docker image:

```bash
docker build -t adgrades-app .
```

Run the container, mapping port 80 of the container to port 80 of the server:

```bash
docker run -d -p 80:80 --name adgrades-container --restart always adgrades-app
```

## Step 6: Verify Deployment

Open your browser and navigate to your Droplet's IP address:

`http://<DROPLET_IP_ADDRESS>`

You should see your application running!

## Optional: Domain & SSL

1.  **Point Domain**: Add an "A" record in your domain registrar's DNS settings pointing to your Droplet's IP.
2.  **SSL Setup**: For HTTPS, I recommend using **Certbot** with Nginx directly on the host (proxying to Docker) or using a reverse proxy container like `nginx-proxy`.

For a simple setup, you can install Nginx on the host and proxy pass to localhost:80 (where your docker container is running), then run certbot.

```bash
apt install nginx
# Configure nginx to proxy_pass to http://localhost:80
apt install certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```
