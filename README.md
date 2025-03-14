# GitHub Repositories Explorer

GitHub Repositories Explorer is a web application built with React that allows users to search for GitHub users and their repositories, view their profile, and explore their public repositories.

## 🚀 Features
- 🔍 **Search GitHub Users** by username
- 👤 **View User Profile** (avatar, name)
- 📂 **List Public Repositories** with star count and programming language
- 🗑️ **Cache Data** using React Query for performance optimization

## 🛠️ Technologies Used
- **React.js** (Vite)
- **TypeScript**
- **React Query** (TanStack Query)
- **Vitest** for testing
- **GitHub API** for fetching data

## 📦 Installation

1. **Clone this repository**
   ```sh
   git clone https://github.com/andriyandriyan/github-repositories-explorer.git
   cd github-repositories-explorer
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Create a `.env` configuration file** and add your GitHub API token (optional, to avoid rate limits)
   ```sh
   VITE_GITHUB_API_TOKEN=your_personal_access_token
   ```

4. **Run the application in development mode**
   ```sh
   npm run dev
   ```

## ✅ Testing

To run unit tests using Vitest:
```sh
npm run test
```

## 📄 API Endpoints Used
This application utilizes the GitHub REST API:
- **Search Users:** `https://api.github.com/search/users?q={query}`
- **User Public Repositories:** `https://api.github.com/users/{username}/repos`

## 📝 Notes
- You can use a **GitHub Personal Access Token** to increase the API rate limit.
- Ensure you are using **Node.js v18+** for compatibility with the latest packages.
