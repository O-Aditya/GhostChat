# GhostChat - Real-Time Self-Destructing Messaging

GhostChat is a modern, privacy-focused real-time messaging application. It allows users to create anonymous, temporary chat rooms where messages self-destruct after a set period.

Built with **Next.js 16**, **ElysiaJS**, and **Upstash Redis**, it features instant syncing and ephemeral storage, ensuring that your conversations don't leave a permanent footprint.



## 🚀 Key Features

* **💣 Self-Destructing Messages**: Rooms and messages automatically expire and are wiped from the server after a set TTL (Time To Live).
* **⚡ Real-Time Communication**: Instant messaging powered by `@upstash/realtime` and WebSockets.
* **👤 100% Anonymous**: No login required. Identities (e.g., `Anonymous-Wolf-4921`) are generated on the fly.
* **🎨 Modern UI**: Built with Tailwind CSS v4 and Framer Motion for smooth animations.

## 🛠️ Tech Stack

**Frontend**
* **Framework**: Next.js 16 (App Router)
* **Styling**: Tailwind CSS v4, Lucide React (Icons)
* **State/Data**: TanStack Query (React Query)
* **Animations**: Motion (Framer Motion)

**Backend & Database**
* **API Framework**: ElysiaJS (running via Next.js API routes)
* **Database**: Upstash Redis (Serverless Key-Value Store)
* **Realtime**: Upstash Realtime (WebSocket/Server-Sent Events)
* **Validation**: Zod

## ⚙️ Prerequisites

Before you begin, ensure you have the following:

* Node.js 18+ installed.
* An [Upstash](https://upstash.com/) account (Free tier works perfectly).

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/ghostchat.git](https://github.com/yourusername/ghostchat.git)
    cd ghostchat
    ```

2.  **Install dependencies**
    ```bash
    bun install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Environment Configuration**
    Create a `.env.local` file in the root directory and add your Upstash credentials.

    ```env
    # .env.local

    # Upstash Redis Database
    UPSTASH_REDIS_REST_URL="[https://your-database-url.upstash.io](https://your-database-url.upstash.io)"
    UPSTASH_REDIS_REST_TOKEN="your-redis-token"
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to start chatting.

## 📂 Project Structure

```bash
├── app/
│   ├── api/             # ElysiaJS Backend Routes
│   ├── room/[id]/       # Chat Room Page
│   └── page.tsx         # Landing Page
├── components/          # UI Components (Modals, Chat Bubbles)
├── lib/
│   ├── redis.ts         # Redis Client
│   ├── realtime.ts      # Realtime Client
│   └── utils.ts         # Helper functions
└── public/              # Static assets