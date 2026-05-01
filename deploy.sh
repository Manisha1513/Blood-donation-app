#!/bin/bash

echo "🚀 Deploying Blood Donation Management System..."

# Check if there are changes
if [[ -z $(git status -s) ]]; then
    echo "✅ No changes to deploy"
    exit 0
fi

# Add all changes
git add .

# Commit with message
echo "📝 Enter commit message:"
read commit_message
git commit -m "$commit_message"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo "✅ Deployment triggered! Check Render/Vercel dashboard for progress."
echo "🔗 Frontend: https://blood-donation-frontend.onrender.com"
echo "🔗 Backend: https://blood-donation-backend.onrender.com"
