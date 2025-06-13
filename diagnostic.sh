#!/bin/bash

echo "=== GitHub Pages Deployment Diagnostic ==="
echo ""

# Check if the repository name matches the base configuration
echo "1. Current configuration:"
echo "   Site: https://kivamz.github.io/raverevolutionbeats/"
echo "   Base: /raverevolutionbeats/"
echo ""

# Check git remote
echo "2. Git remote configuration:"
git remote -v
echo ""

# Check current branch
echo "3. Current branch:"
git branch --show-current
echo ""

# Check if gh-pages branch exists and has content
echo "4. Checking gh-pages branch:"
git branch -a | grep gh-pages
echo ""

# Test URLs
echo "5. Testing URLs (this will show what GitHub Pages is serving):"
echo "   Main URL: https://kivamz.github.io/raverevolutionbeats/"
echo "   Direct index: https://kivamz.github.io/raverevolutionbeats/index.html"
echo ""

echo "6. Build output structure:"
ls -la dist/
echo ""

echo "=== Instructions ==="
echo "1. Wait 2-3 minutes for GitHub Pages to update"
echo "2. Check GitHub repository settings -> Pages"
echo "3. Ensure source is set to 'Deploy from a branch' -> 'gh-pages' -> '/ (root)'"
echo "4. Verify the repository name is exactly 'raverevolutionbeats'"
