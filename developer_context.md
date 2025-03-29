# Developer Context for TheBurgerBlog

This document captures critical context for development operations on TheBurgerBlog next.js project.

## Environment Requirements

- **Node.js Environment**: Always use the conda environment named "nodejs"
  ```bash
  conda activate nodejs
  ```
  
- **Command Execution**: 
  - Always execute npm commands within the nodejs conda environment
  - Example: `conda activate nodejs && npm run build`
  - Incorrect: `npm run build` (without activating nodejs environment first)

- **Installation Workflow**:
  - Let the user handle dependency installation
  - Don't execute `npm install` directly

## Project Structure

- **Framework**: Next.js 15+
- **Authentication**: Supabase (previously migrated from Clerk)
- **Database**: Supabase PostgreSQL (previously migrated from Prisma)
- **Content**: MDX with gray-matter for frontmatter parsing
- **Styling**: Tailwind CSS

## Important Paths

- **Project Root**: `/Users/fp/Documents/Code/web/theburgerblog-next/theburgerblog-next/`
- **Content Directory**: `/content/posts/` - Contains MDX blog posts
- **Supabase Configuration**:
  - Client-side: `src/lib/supabase.ts`
  - Server-side: `src/lib/supabase-server.ts`
  - Database schema: `migrations/01_initial_schema.sql`

## Common Operations

- **Development Server**:
  ```bash
  conda activate nodejs && npm run dev
  ```

- **Build Application**:
  ```bash
  conda activate nodejs && npm run build
  ```

- **Content Migration**:
  ```bash
  conda activate nodejs && npm run import
  ```

## Build Configuration

- ESLint and TypeScript errors are configured to be ignored during builds in `next.config.js`
- JSX in the project requires proper escaping of apostrophes with `&apos;`

## Recent Changes

- Migrated from Clerk to Supabase for authentication
- Migrated from Prisma to Supabase for database operations
- Updated middleware to handle Supabase authentication
- Removed unnecessary dependencies and configuration files

## Important Notes

- The database connection string uses Supabase PostgreSQL
- Supabase URL and anon key are required in `.env.local`
- The blog uses MDX for content with frontmatter for metadata
- Authentication flows are implemented with Supabase Auth 