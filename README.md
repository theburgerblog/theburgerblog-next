# TheBurgerBlog

<!-- ![TheBurgerBlog](./public/images/burger.jpg) -->
<img align="left" src="./public/images/burger.jpg" width="100"></a>


**TheBurgerBlog** is a modern, high-performance blog application dedicated to reviewing and showcasing the best burgers. Built with the latest web technologies, it demonstrates a comprehensive approach to developing content-rich websites with exceptional user experience.

[View Live Site](https://theburgerblog.at) | [GitHub Repository](#)

## Project Overview

TheBurgerBlog is a complete rebuild of a popular burger review blog, transforming it from a traditional Jekyll static site into a modern, dynamic Next.js application. The site retains the content focus while adding dynamic features like user authentication, commenting, and a powerful content management system.

### Key Features

- **Dynamic Blog Engine** - MDX-based content rendering with frontmatter support
- **Visual Rating System** - Interactive visualization of burger ratings across multiple categories
- **User Authentication** - Complete authentication flow with email/password and profile management
- **Interactive Comments** - Real-time commenting system on blog posts
- **Responsive Design** - Beautiful, mobile-first design with dark mode support
- **Admin Dashboard** - Secure portal for content management
- **Content Migration Tool** - Custom utility for migrating from Jekyll to Next.js/MDX

## Technology Stack

### Frontend
- **Next.js 15+** - React framework with App Router and Server Components
- **React 19** - Latest React features including hooks and suspense
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first styling approach with custom theme
- **MDX** - Enhanced Markdown with React components support

### Backend
- **Supabase** - Open-source Firebase alternative
  - PostgreSQL database with Row-Level Security
  - Authentication service with secure session handling
  - Storage for media assets

### Infrastructure
- **Vercel** - Edge-optimized deployment platform
- **GitHub Actions** - CI/CD workflows for testing and deployment

## Architecture Highlights

### Content System
The blog uses a hybrid approach to content management:
- **Content as Code** - Blog posts stored as MDX files in the repository
- **Dynamic Data** - Comments, user profiles, and ratings stored in Supabase
- **Image Optimization** - Next.js Image component for optimized delivery

### Authentication Flow
Implements a secure authentication pattern with Supabase:
- Email/password registration with confirmation
- Secure session management with JWT
- Protected routes with server-side validation
- Profile management with avatar uploads

### Performance Optimization
- Static generation (SSG) for content pages
- Incremental Static Regeneration for fresh content
- Edge caching for optimal global performance
- Responsive images with automatic sizing and formats

## Showcase

### Blog Post View
![Blog Post](https://example.com/screenshots/post.jpg)
The blog post view combines rich MDX content with interactive elements like the rating card and comments.

### Rating System
![Rating System](https://example.com/screenshots/rating.jpg)
Each burger is rated across multiple categories (taste, texture, value), with a visual presentation of results.

### Responsive Design
![Mobile View](https://example.com/screenshots/mobile.jpg)
The site is fully responsive with a mobile-first approach.

## Developer Experience

The project demonstrates several best practices:
- **Type Safety** - Comprehensive TypeScript implementation
- **Component Architecture** - Modular, reusable components
- **Server Components** - Leveraging Next.js App Router architecture
- **API Routes** - RESTful API endpoints for dynamic operations
- **Environment Isolation** - Proper separation of development/production environments

## Learning Outcomes

Building this project provided valuable experience in:
- Migrating from a static site generator to a dynamic framework
- Implementing authentication in a Next.js application
- Working with MDX for rich content
- Building a hybrid static/dynamic architecture
- Designing and implementing Row-Level Security with Supabase

## About the Author

This project was developed by [Your Name], a web developer with a passion for creating exceptional user experiences through modern web technologies.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Original Jekyll theme and content from [theburgerblog.at](https://theburgerblog.at)
- [Supabase](https://supabase.io) for database, auth, and backend services
- [Next.js](https://nextjs.org) for the incredible React framework
- [Vercel](https://vercel.com) for hosting and deployment
