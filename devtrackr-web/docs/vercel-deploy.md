# Deploying DevTrackr Web to Vercel

## 1. Install Vercel CLI

First, install the Vercel CLI globally on your machine:

```bash
npm install -g vercel
```

## 2. Login to Vercel

Authenticate your Vercel account from the terminal:

```bash
vercel login
```

## 3. Deploy

Deploy the application to the production environment:

```bash
vercel --prod
```

## 4. Environment Variables

Once the deployment is complete, you need to configure the environment variables in the Vercel Dashboard so the frontend knows where to find the backend API.

1. Go to your project on the [Vercel Dashboard](https://vercel.com/dashboard).
2. Navigate to **Settings** → **Environment Variables**.
3. Add a new variable:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `http://EC2_PUBLIC_IP` *(replace `EC2_PUBLIC_IP` with the actual public IP address of your EC2 instance)*.

## 5. Redeploy

After setting the environment variable, you must redeploy the application for the changes to take effect:

```bash
vercel --prod
```