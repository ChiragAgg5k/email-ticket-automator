# 📧 Email Ticket

A modern, AI-powered helpdesk platform that transforms email support into an organized ticket management system. Built with React, TypeScript, Postmark, and Appwrite for seamless customer support experiences.

![Email Ticket Dashboard](/assets/banner.png)

## 🏹 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Postmark account for email parsing
- Appwrite account for backend services

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ChiragAgg5k/email-ticket-automator.git
   cd email-ticket-automator
   ```

2. **Install dependencies**

   ```bash
   bun i # or npm install
   ```

3. **Configure Appwrite**

   - Create an Appwrite project at [cloud.appwrite.io](https://cloud.appwrite.io)
   - Update the configuration in `src/lib/appwrite.ts`:

   ```typescript
   client.setEndpoint("YOUR_APPWRITE_ENDPOINT");
   client.setProject("YOUR_PROJECT_ID");
   ```

4. **Start the development server**

   ```bash
   bun dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080` to see the application

## 🛠️ Tech Stack

### Frontend

- **React** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components

### Backend & Services

- **Appwrite** - Backend-as-a-Service for authentication and database
- **React Router** - Client-side routing and navigation
- **React Hook Form** - Performant form handling and validation

### State Management & Data

- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management and caching
- **Lucide React** - Beautiful, customizable icons

### Email Parsing

- **Postmark** - Email parsing and processing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── HeroSection.tsx # Landing page hero
│   └── ...
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── Auth.tsx        # Authentication page
│   ├── Tickets.tsx     # Ticket dashboard
│   └── NotFound.tsx    # 404 page
├── lib/                # Utilities and configuration
│   ├── appwrite.ts     # Appwrite client setup
│   ├── auth.ts         # Authentication hook
│   ├── stores/         # Zustand stores
│   └── utils.ts        # Helper functions
└── main.tsx           # Application entry point
```

### Manual Deployment

1. Build the project: `bun run build` or `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure environment variables in your hosting platform

### 📃 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
