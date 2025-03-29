# TheBurgerBlog - Next.js Version

A modern, full-stack blog application for TheBurgerBlog, built with Next.js, React, TypeScript, Tailwind CSS, and more.

## Tech Stack

- **Frontend**: Next.js 15+ (React + TypeScript)
- **Styling**: Tailwind CSS
- **Content**: MDX with gray-matter for frontmatter parsing
- **Backend**: Supabase (PostgreSQL + Authentication)
- **API**: Next.js API Routes & Supabase Client
- **Authentication**: Supabase Auth
- **Comments**: Self-built commenting system with Supabase
- **Deployment**: Vercel
- **Version Control**: GitHub

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- Supabase account (for database and authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd theburgerblog-next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new project in Supabase
   - Get your project URL and anon key from the API settings
   - In SQL Editor, run the migration found in `migrations/01_initial_schema.sql`

4. Set up environment variables:
   - Run the setup script to create your `.env.local` file:
     ```bash
     npm run setup
     ```
   - Edit the `.env.local` file with your Supabase URL and anon key

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Migration

To migrate content from the Jekyll blog:

1. Ensure the Jekyll source files are in the `../jekyll-source` directory
2. Run the migration script:
   ```bash
   node scripts/migrate-posts.js
   ```

This will:
- Convert Jekyll Markdown posts to MDX format
- Extract metadata (frontmatter)
- Copy images to the public directory
- Update image references in the content

## Authentication

The blog uses Supabase Authentication which provides:
- Email/password sign up and login
- Profile management
- Secure session handling

The authentication flow is implemented in these key files:
- `src/lib/supabase.ts` - Client-side Supabase client and auth utilities
- `src/lib/supabase-server.ts` - Server-side Supabase client for secure operations
- `src/components/auth/SignInForm.tsx` - Login interface
- `src/components/auth/SignUpForm.tsx` - Registration interface

## Deployment

The site is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure the environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

## Project Structure

```
theburgerblog-next/
├── src/
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # React components
│   │   ├── ui/               # UI elements
│   │   ├── layout/           # Layout components
│   │   ├── blog/             # Blog-specific components
│   │   └── auth/             # Authentication components
│   ├── lib/                  # Utility functions and libraries
│   └── types/                # TypeScript type definitions
├── content/                  # Blog content
│   └── posts/                # MDX files for blog posts
├── migrations/               # Database migration files
├── public/                   # Static assets
│   └── images/               # Post images
└── scripts/                  # Utility scripts
    └── migrate-posts.js      # Migration script for Jekyll posts
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Original Jekyll theme and content from [theburgerblog.at](https://theburgerblog.at)
- [Supabase](https://supabase.io) for database, auth, and backend services
