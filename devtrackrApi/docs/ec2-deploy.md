# Deploying DevTrackr API to AWS EC2

## 1. EC2 Setup Steps

1. Go to **AWS Console** → **EC2** → **Launch instance**
2. **AMI:** Select `Ubuntu 22.04 LTS`
3. **Instance type:** Select `t2.micro` (free tier eligible)
4. **Security group inbound rules:**
   - **SSH:** port `22` from `My IP` (or your specific IP)
   - **HTTP:** port `80` from `0.0.0.0/0` (Anywhere)
   - **Custom TCP:** port `3000` from `0.0.0.0/0` (Anywhere)
5. **Key pair:** Create and download a new `.pem` key pair
6. Click **Launch instance**

## 2. EC2 Server Setup Commands

Connect to your EC2 instance using the downloaded `.pem` key:

```bash
ssh -i key.pem ubuntu@EC2_PUBLIC_IP
```

Update the system and install Docker:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```
*(Note: You may need to log out and log back in for the docker group changes to take effect).*

## 3. Docker Hub Deploy Flow

### On your local machine:

Log in to Docker Hub, build the image, and push it:

```bash
docker login
docker build -t YOUR_DOCKERHUB/devtrackr-api .
docker push YOUR_DOCKERHUB/devtrackr-api
```

### On your EC2 instance:

Pull the image and run the container in the background:

```bash
docker pull YOUR_DOCKERHUB/devtrackr-api
docker run -d -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="..." \
  -e PORT=3000 \
  --name devtrackr-api \
  YOUR_DOCKERHUB/devtrackr-api
```

## 4. Run Prisma Migrations on EC2

To apply database migrations to your production RDS database, run the Prisma migration command inside the running container:

```bash
docker exec devtrackr-api npm run migrate:deploy
```
