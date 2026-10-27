# SocialPulse API (Insta-Lite)

A lightweight social media backend inspired by Instagram-style features, preserved with all the original functionality:

- User profiles and account management
- Post creation, listing, updates, and deletion
- Like management on posts
- Prisma + PostgreSQL data modeling
- Express API routes with structured pagination, logging, and error handling

This version keeps the full code structure and behavior while making the project feel customized and reusable for your own app.

## Getting started

1. Copy `.env.example` to `.env` and set your PostgreSQL connection string:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run Prisma generate and apply database migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Optional: Seed the database with sample users and posts:
   ```bash
   npm run seed
   ```
5. Start the server:
   ```bash
   npm start
   ```

## API Reference

### Health Check
- `GET /health` — Check server status (`{"status": "OK"}`)

### Users (`/users`)
- `POST /users` — Create a new user (`username`, `email`, `fullname`, `bio`)
- `GET /users` — List users with pagination (`?page=1&limit=10&search=...&sort=asc|desc`)
- `GET /users/:id` — Get single user profile by ID with post/like counts
- `PATCH /users/:id` — Update user profile details
- `DELETE /users/:id` — Delete a user account (cascades to posts and likes)
- `GET /users/:id/posts` — List posts authored by user (paginated)
- `GET /users/:id/liked-posts` — List posts liked by user (paginated)

### Posts (`/posts`)
- `POST /posts` — Create a new post (`imageUrl`, `authorId`, `caption`, `location`)
- `GET /posts` — List posts with pagination and filters (`?page=1&limit=10&location=...&authorId=...`)
- `GET /posts/:id` — Get single post by ID with author details and like count
- `PATCH /posts/:id` — Update post details (`caption`, `location`, `imageUrl`)
- `DELETE /posts/:id` — Delete a post
- `GET /posts/:id/likes` — List users who liked the post
- `POST /posts/:id/likes` — Like a post (`{"userId": <id>}`)
- `DELETE /posts/:id/likes` — Remove a like (`{"userId": <id>}`)

## Project structure

- `src/index.js` — Express server entry point & middleware mounting
- `src/middlewares/` — Request logger, 404, and centralized error handler
- `src/routes/` — API route definitions for users and posts
- `src/controllers/` — Request validation and controller logic
- `src/services/` — Prisma query logic for users, posts, and likes
- `src/utils/` — Pagination helpers
- `prisma/schema.prisma` — PostgreSQL Prisma schema definition
- `prisma/seed.js` — Database seeder with sample data

## Notes

The project logic and features were intentionally kept intact. Only the project identity and setup guidance were updated so you can adapt it without losing any existing functionality.
