# 📧 EmailTicket

A modern, AI-powered helpdesk platform that transforms email support into an organized ticket management system. Built with React, TypeScript, and Appwrite for seamless customer support experiences.

![EmailTicket Dashboard](https://via.placeholder.com/800x400/4285F4/FFFFFF?text=EmailTicket+Dashboard)

## ✨ Features

### 🎯 Core Functionality

- **Email-to-Ticket Conversion**: Automatically convert customer emails into organized support tickets
- **Real-time Dashboard**: Monitor all support requests in a centralized, responsive interface
- **Priority Management**: Categorize tickets by priority (Low, Medium, High) for efficient triage
- **Status Tracking**: Track ticket progress through Open, In-Progress, and Closed states
- **Detailed Ticket Views**: Comprehensive ticket information with raw JSON data access

### 🔐 Authentication & Security

- **Multi-auth Support**: Email/password and Google OAuth integration via Appwrite
- **Secure Sessions**: Persistent authentication with automatic session management
- **Protected Routes**: Secure access to dashboard and ticket management features

### 🎨 User Experience

- **Responsive Design**: Beautiful, mobile-first interface built with Tailwind CSS
- **Modern UI Components**: Powered by shadcn/ui for consistent, accessible design
- **Smooth Animations**: Enhanced user interactions with Tailwind CSS animations
- **Toast Notifications**: Real-time feedback for all user actions

### 📊 Advanced Features

- **Search & Filter**: Quickly find tickets by various criteria
- **Data Export**: Access raw ticket data in JSON format
- **Form Validation**: Comprehensive client-side validation with react-hook-form
- **Loading States**: Professional loading indicators throughout the application

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Appwrite account for backend services

### Installation

1. **Clone the repository**

   ```bash
   git clone <YOUR_GIT_URL>
   cd emailticket
   ```

2. **Install dependencies**

   ```bash
   npm install
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
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
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

## 🎯 Usage Guide

### Getting Started

1. **Visit the landing page** to learn about EmailTicket's features
2. **Sign up** for a new account or **sign in** with existing credentials
3. **Access the dashboard** to view and manage support tickets

### Managing Tickets

- **View all tickets** in the comprehensive dashboard table
- **Click any ticket** to see detailed information and raw data
- **Create new tickets** using the built-in form
- **Set priorities** to organize your support queue effectively

### Authentication

- **Email/Password**: Traditional account creation and login
- **Google OAuth**: One-click authentication via Google
- **Persistent sessions**: Stay logged in across browser sessions

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
```

### Code Style

- **TypeScript strict mode** enabled for type safety
- **ESLint** configured for code quality
- **Prettier** for consistent formatting
- **Component-first architecture** for maintainability

## 🚀 Deployment

### Lovable Platform (Recommended)

1. Click the **Publish** button in the Lovable editor
2. Your app will be deployed automatically
3. Optionally connect a custom domain in Project Settings

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure environment variables in your hosting platform

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Need help? We're here for you!

- 📧 **Email**: support@emailticket.com
- 💬 **Discord**: [Join our community](https://discord.gg/emailticket)
- 📖 **Documentation**: [docs.emailticket.com](https://docs.emailticket.com)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/emailticket/issues)

## 🎉 Acknowledgments

- **shadcn** for the amazing UI component library
- **Appwrite** for the robust backend infrastructure
- **Lovable** for the incredible development platform
- **Tailwind CSS** for the beautiful, responsive design system

---

<div align="center">
  <p>Built with ❤️ using <a href="https://lovable.dev">Lovable</a></p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
