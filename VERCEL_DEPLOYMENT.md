# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the RoyaltyFHE application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository access
- Domain name (optional)

## Step-by-Step Deployment

### 1. Environment Variables Setup

Before deploying, configure these environment variables in Vercel:

#### Required Environment Variables:
```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
VITE_INFURA_API_KEY=your_infura_api_key
VITE_ROYALTY_CONTRACT_ADDRESS=your_contract_address
```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your repository
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Go to "Environment Variables" tab
   - Add each variable from the list above
   - Set for "Production", "Preview", and "Development"

5. **Deploy**
   - Click "Deploy"
   - Wait for build completion

#### Option B: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Directory**
   ```bash
   cd /path/to/secure-split-sound
   vercel
   ```

### 3. Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test wallet connection functionality
- [ ] Verify contract interactions work
- [ ] Check responsive design
- [ ] Test all navigation routes
- [ ] Verify favicon and meta tags
- [ ] Check console for errors

### 4. Custom Domain Setup (Optional)

1. **Add Domain in Vercel Dashboard**
   - Go to project settings
   - Navigate to "Domains" tab
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update DNS Records**
   - Add CNAME record pointing to your Vercel deployment
   - Wait for DNS propagation

### 5. Monitoring and Analytics

1. **Enable Vercel Analytics**
   - Go to project settings
   - Enable "Vercel Analytics"
   - Monitor performance metrics

2. **Error Tracking**
   - Consider integrating error tracking service
   - Monitor for runtime errors

### 6. Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Rollback to previous deployments if needed

### 7. Troubleshooting

#### Common Issues:

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **Environment Variables Not Working**
   - Ensure variables start with `VITE_` prefix
   - Redeploy after adding new variables
   - Check variable names match exactly

3. **Wallet Connection Issues**
   - Verify WalletConnect project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches network

4. **Contract Interaction Failures**
   - Verify contract is deployed to correct network
   - Check contract address is correct
   - Ensure user has sufficient gas

### 8. Security Considerations

- Never commit private keys or sensitive data
- Use environment variables for all configuration
- Enable HTTPS (automatic with Vercel)
- Regularly update dependencies
- Monitor for security vulnerabilities

### 9. Performance Optimization

- Enable Vercel's Edge Functions if needed
- Optimize images and assets
- Use CDN for static assets
- Monitor Core Web Vitals

## Deployment URLs

After successful deployment:
- **Production URL**: `https://your-project.vercel.app`
- **Preview URLs**: Generated for each branch/PR
- **Custom Domain**: Your configured domain (if set up)

## Support

For deployment issues:
- Check Vercel documentation
- Review build logs in Vercel dashboard
- Contact Vercel support if needed
- Check GitHub repository for latest updates

## Next Steps

1. Deploy smart contracts to testnet
2. Update contract addresses in environment variables
3. Test all functionality on deployed site
4. Set up monitoring and analytics
5. Plan mainnet deployment strategy