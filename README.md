# GitExplore

A modern GitHub repository explorer and analytics dashboard built with the GitHub REST API.

GitExplore provides a clean and responsive interface for exploring repositories, developers, commits, contributors, languages, and repository activity.

---

# Features

- Repository search
- Repository analytics
- User profile viewer
- Contributors leaderboard
- Commit history viewer
- Language breakdown charts
- README markdown rendering
- Repository comparison
- Responsive modern UI
- Dark mode support

---

# Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- ShadCN UI
- Framer Motion

## Data Fetching

- TanStack Query
- Axios / Fetch API

## Charts & Visualization

- Recharts

---

# Screens

## Home Page

- Search repositories
- Trending repositories
- Popular topics

## Repository Details

- Repository statistics
- Contributors
- Commits
- README preview
- Language analytics

## User Profiles

- GitHub user overview
- Public repositories
- Profile statistics

## Compare Repositories

- Side-by-side repository comparison

---

# Getting Started

## Clone the repository

git clone https://github.com/Desdera-Tech/gitexplore.git

## Navigate into the project

cd gitexplore

## Install dependencies

npm install

## Start the development server

npm run dev

---

# Environment Variables

Create a `.env.local` file in the root directory.

NEXT_PUBLIC_GITHUB_API_URL=https://api.github.com

Optional GitHub token for higher rate limits:

GITHUB_TOKEN=your_github_token

---

# Project Structure

```bash
src/
├── app/
├── components/
│   ├── repo/
│   ├── user/
│   ├── charts/
│   ├── layout/
│   └── ui/
├── hooks/
├── services/
│   └── github/
├── lib/
├── types/
├── utils/
└── constants/
```

---

# GitHub API

GitExplore uses the GitHub REST API.

Documentation:
https://docs.github.com/en/rest

---

# Roadmap

## Version 1

- Repository search
- Repository details
- User profiles
- README rendering

## Version 2

- Repository comparison
- Charts and analytics
- Advanced filters

## Version 3

- GitHub authentication
- Saved repositories
- Personalized dashboards
