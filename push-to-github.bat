@echo off
echo 🚀 Pushing Next.js Quiz Quest to GitHub...
echo.

echo 📁 Adding all files...
git add .

echo.
echo 💾 Committing changes...
git commit -m "🔧 Fix build issues for deployment

✅ Fixed TypeScript error in page-backup.tsx:
- Changed currentBoss: null to proper Boss object
- Resolves 'Type null is not assignable to type Boss' error

✅ Updated netlify.toml for Next.js:
- Changed publish directory from 'dist' to 'out'
- Now correctly points to Next.js build output

🚀 Build should now pass successfully on Netlify"

echo.
echo 🌐 Pushing to GitHub...
git push origin main

echo.
echo ✅ Done! Your code has been pushed to GitHub!
echo 🎉 Your Next.js app should now deploy successfully!
pause
