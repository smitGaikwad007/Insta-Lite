# SocialPulse API

A lightweight social media backend inspired by Instagram-style features, preserved with all the original functionality:

- user profiles and account management
- post creation, listing, updates, and deletion
- like management on posts
- Prisma + PostgreSQL data modeling
- Express API routes for social app interactions

This version keeps the full code structure and behavior while making the project feel customized and reusable for your own app.

## Getting started

1. Copy `.env.example` to `.env` and set your PostgreSQL connection string.
2. Install dependencies:
   npm install
3. Run Prisma generate if needed:
   npx prisma generate
4. Start the server:
   npm start

## Project structure

- `src/index.js` — Express server entry point
- `src/routes/` — API route definitions
- `src/controllers/` — request handling logic
- `src/services/` — business logic for users and posts
- `prisma/schema.prisma` — database schema

## Notes

The project logic and features were intentionally kept intact. Only the project identity and setup guidance were updated so you can adapt it without losing any existing functionality.
