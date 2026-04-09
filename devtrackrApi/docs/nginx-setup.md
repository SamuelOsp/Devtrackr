# Nginx Reverse Proxy Setup

Setting up Nginx as a reverse proxy allows you to map port 80 (HTTP) to port 3000 (where your DevTrackr API container is running).

## 1. Install Nginx

```bash
sudo apt install nginx -y
```

## 2. Configure Nginx

Create a new configuration file for DevTrackr:

```bash
sudo nano /etc/nginx/sites-available/devtrackr
```

Add the following configuration:

```nginx
server {
  listen 80;
  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

## 3. Enable Configuration and Restart Nginx

Create a symbolic link to enable the site, test the configuration, and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/devtrackr /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```
