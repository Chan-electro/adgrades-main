# Deploying AdGrades to a DigitalOcean Droplet

This guide will walk you through deploying your React/Vite application to a DigitalOcean Droplet using the existing `Dockerfile` in your project.

## Prerequisites

1.  **DigitalOcean Account**: You need an active account.
2.  **GitHub Repository**: Ensure your latest code is pushed to GitHub.
3.  **Terminal/Command Prompt**: To run SSH commands.

---

## Step 1: Create a DigitalOcean Droplet

1.  Log in to your DigitalOcean Control Panel.
2.  Click **Create** -> **Droplets**.
3.  **Choose Region**: Select a datacenter closest to your target audience (e.g., Bangalore, London, NYC).
4.  **Choose Image**:
    *   Go to the **Marketplace** tab.
    *   Search for **Docker** and select **Docker on Ubuntu**. This saves you from installing Docker manually.
5.  **Choose Size**: The **Basic** plan ($4/mo or $6/mo) is sufficient for this static site.
6.  **Authentication**:
    *   **SSH Key** (Recommended): Select your existing public key or add a new one.
    *   **Password**: Create a strong root password if you prefer.
7.  **Finalize**: Give your Droplet a name (e.g., `adgrades-web`) and click **Create Droplet**.
8.  **Wait**: Once created, copy the **IP Address** (e.g., `192.0.2.1`).

---

## Step 2: Connect to Your Droplet

Open your terminal and SSH into your new server:

```bash
ssh root@<YOUR_DROPLET_IP>
```
*If asked to verify authenticity, type `yes`.*

---

## Step 3: Clone Your Repository

Once logged into the Droplet, download your code:

1.  Clone the repository (replace with your actual repo URL):
    ```bash
    git clone https://github.com/Start-Up-Software-Solutions/marketing-website.git
    ```
    *(Note: If your repo is private, you will be asked for your GitHub username and a Personal Access Token (PAT) as the password).*

2.  Navigate into the project folder:
    ```bash
    cd marketing-website
    ```
    *(Adjust folder name if different).*

---

## Step 4: Build and Run the Application

Since you already have a `Dockerfile` configured to build the React app and serve it with Nginx, you just need to tell Docker to do its magic.

1.  **Build the Docker Image**:
    ```bash
    docker build -t adgrades-app .
    ```
    *This might take a minute or two as it installs dependencies and builds the site.*

2.  **Run the Container**:
    ```bash
    docker run -d -p 80:80 --restart always --name adgrades-container adgrades-app
    ```
    *   `-d`: Runs in the background (detached mode).
    *   `-p 80:80`: Maps port 80 of the server to port 80 of the container (standard web traffic).
    *   `--restart always`: Automatically restarts the app if the server reboots or crashes.

---

## Step 5: Verify Deployment

Open your browser and visit: `http://<YOUR_DROPLET_IP>`

You should see your AdGrades website live!

---

## Step 6: Updating the Site in Future

When you push new changes to GitHub, follow these steps to update the live site:

1.  SSH into the server: `ssh root@...`
2.  Go to the folder: `cd marketing-website`
3.  Pull changes: `git pull`
4.  Rebuild image: `docker build -t adgrades-app .`
5.  Stop old container: `docker stop adgrades-container`
6.  Remove old container: `docker rm adgrades-container`
7.  Start new container: `docker run -d -p 80:80 --restart always --name adgrades-container adgrades-app`

---

## Optional: Pointing a Domain

If you have a domain (e.g., `adgrades.com`):

1.  Go to your Domain Registrar (GoDaddy, Namecheap, etc.).
2.  Find **DNS Settings**.
3.  Add an **A Record**:
    *   **Host**: `@`
    *   **Value**: `<YOUR_DROPLET_IP>`
    *   **TTL**: Automatic or 3600
4.  Wait for propagation (usually minutes).
