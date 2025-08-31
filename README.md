# Turn Signal

> Transform your GitHub issues into beautiful, public roadmaps that keep your users informed about what's coming next.

Turn Signal is an open-source tool that helps you create public product roadmaps directly from your GitHub issues and pull requests. Stop driving blind and give your users clear visibility into your development roadmap and let them vote on what matters most.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: SQLite with Drizzle ORM (hosted on Cloudflare D1)
- **Authentication**: Better Auth
- **API**: tRPC
- **Styling**: Tailwind CSS with shadcn/ui components
- **Email**: React Email with Resend
- **Deployment**: Cloudflare Workers (via OpenNext.js)

## 🏁 Quick Start

### Prerequisites

- Node.js 22+
- npm or pnpm
- GitHub account (for integration)
- Cloudflare account (for deployment)

### Local Development

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Copy the environment file and fill in your values:

   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:

   ```env
   # Database (Cloudflare D1)
   CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
   CLOUDFLARE_DATABASE_ID=your_d1_database_id
   CLOUDFLARE_D1_TOKEN=your_d1_token

   # Authentication
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=http://localhost:9000

   # GitHub Integration
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_WEBHOOK_SECRET=your_webhook_secret

   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=noreply@yourdomain.com

   # Next.js
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:9000
   ```

4. **Set up the database**

   ```bash
   # Push schema to Cloudflare D1
   npx wrangler d1 migrations apply your-database-name --local
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:9000](http://localhost:9000) to see the application.

## 🏗️ Project Structure

```
turn-signal/
├── app/                    # Next.js app router pages
│   ├── (marketing)/        # Marketing pages
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   ├── login/              # Authentication
│   └── roadmap/            # Public roadmap pages
├── components/             # React components
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   └── marketing/          # Marketing-specific components
├── db/                     # Database schema and migrations
├── server/                 # tRPC server setup
│   ├── routers/            # API route handlers
│   └── trpc.ts             # tRPC configuration
├── lib/                    # Utility functions
├── auth/                   # Authentication configuration
└── email/                  # Email templates
```

## 🔧 Configuration

### GitHub App Setup

1. Create a new GitHub App in your GitHub settings
2. Set the webhook URL to your deployment URL
3. Copy the client ID and secret to your environment variables
4. Install the app on your repositories

### Email Configuration

1. Sign up for a [Resend](https://resend.com) account
2. Add your API key to environment variables
3. Configure your domain for sending emails
