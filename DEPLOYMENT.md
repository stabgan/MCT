# Deploying MedCode-Transformer Website to GitHub Pages

This guide will help you deploy your MCT website to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Your code pushed to a GitHub repository
3. Node.js and npm installed locally

## Important Configuration

1. **Update the base path in `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/YOUR-REPOSITORY-NAME/', // Replace with your actual repo name
   })
   ```
   
   For example, if your repository is named `MCT-WEBSITE`, keep it as:
   ```typescript
   base: '/MCT-WEBSITE/',
   ```

## Method 1: Automatic Deployment with GitHub Actions (Recommended)

This method automatically deploys your site whenever you push to the main branch.

### Steps:

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"

3. **The deployment will happen automatically!**
   - The GitHub Action workflow (`.github/workflows/deploy.yml`) will run
   - It will build your site and deploy it to GitHub Pages
   - You can monitor the progress in the "Actions" tab of your repository

4. **Access your deployed site:**
   - Your site will be available at: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`
   - For example: `https://yourusername.github.io/MCT-WEBSITE/`

## Method 2: Manual Deployment with gh-pages

If you prefer to deploy manually from your local machine:

### First-time setup:

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy your site:**
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages:**
   - Go to your repository Settings > Pages
   - Under "Build and deployment":
     - Source: "Deploy from a branch"
     - Branch: `gh-pages`
     - Folder: `/ (root)`
   - Click Save

### Subsequent deployments:

Just run:
```bash
npm run deploy
```

## Troubleshooting

### Site not showing up?
- Check if GitHub Pages is enabled in repository settings
- Verify the base path in `vite.config.ts` matches your repository name
- Wait a few minutes for GitHub Pages to deploy (first deployment can take up to 10 minutes)
- Check the Actions tab for any deployment errors

### 404 errors on refresh?
- This is normal for single-page applications
- The current setup handles this with proper routing

### Build failing?
- Check the Actions tab for error messages
- Ensure all dependencies are listed in package.json
- Verify TypeScript has no compilation errors by running `npm run build` locally

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public` directory with your domain:
   ```
   www.yourdomain.com
   ```

2. Configure your domain's DNS settings to point to GitHub Pages:
   - A record: `185.199.108.153`
   - A record: `185.199.109.153`
   - A record: `185.199.110.153`
   - A record: `185.199.111.153`
   - CNAME record: `YOUR-USERNAME.github.io`

3. Enable HTTPS in repository Settings > Pages

## Updating Your Site

Every time you push changes to the main branch, the site will automatically redeploy if you're using the GitHub Actions method.

For manual deployment, run `npm run deploy` after making changes.

## View Deployment Status

You can monitor your deployments:
- **GitHub Actions:** Go to the "Actions" tab in your repository
- **Deployment URL:** Check Settings > Pages for your live URL
- **Build logs:** Available in the Actions tab for each deployment

Your MCT website is now live! 🎉 