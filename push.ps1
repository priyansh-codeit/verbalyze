# Verbalyze GitHub Push Automator
$RepoUrl = "https://github.com/priyansh-codeit/verbalyze.git"

Write-Host "Checking for Git installation..." -ForegroundColor Cyan
$gitExists = Get-Command git -ErrorAction SilentlyContinue

if (-not $gitExists) {
    Write-Host "Error: Git was not found in your system's PATH." -ForegroundColor Red
    Write-Host "Please download and install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "After installation is complete, close and reopen your terminal, then run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit..."
    exit
}

Write-Host "Git detected successfully!" -ForegroundColor Green

# Check if git is already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing local Git repository..." -ForegroundColor Cyan
    git init
}

# Add files
Write-Host "Staging files..." -ForegroundColor Cyan
git add .

# Commit
Write-Host "Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit of Verbalyze AI platform - interactive voice mock prep platform"

# Configure branch
Write-Host "Setting main branch..." -ForegroundColor Cyan
git branch -M main

# Set remote origin
Write-Host "Configuring remote repository origin..." -ForegroundColor Cyan
$remoteExists = git remote show | Select-String "origin"
if ($remoteExists) {
    git remote set-url origin $RepoUrl
} else {
    git remote add origin $RepoUrl
}

Write-Host "Attempting to push files to GitHub..." -ForegroundColor Cyan
Write-Host "Note: If this is your first time pushing, Git may open a browser popup prompting you to log in/authenticate with your GitHub account." -ForegroundColor Yellow

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccessfully pushed to $RepoUrl!" -ForegroundColor Green
} else {
    Write-Host "`nFailed to push. Please verify that the repository exists on your GitHub account (https://github.com/priyansh-codeit/verbalyze) and you have write permissions." -ForegroundColor Red
}

Read-Host "Press Enter to exit..."
