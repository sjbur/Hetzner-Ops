# Hetzner Cloud Admin Panel

Web interface for managing Hetzner Cloud infrastructure. Allows you to manage servers, snapshots, and SSH keys through a user-friendly interface.

## ⚠️ Prerequisites

Before you start, you'll need a Hetzner Cloud API token. You can create one in the Hetzner Cloud Console:

1. Go to [Hetzner Cloud Console](https://console.hetzner.cloud)
2. Navigate to Security > API Tokens
3. Create a new API token with appropriate permissions

For more details, see the [Hetzner Cloud API Documentation](https://docs.hetzner.com/cloud/api/getting-started/using-api).

## 🚀 Features

- Server management (creation, start, stop, reboot, deletion)
- Real-time server metrics monitoring (CPU, disk, network)
- Snapshot management for backups
- SSH key management for secure access
- Light and dark theme support
- Multilingual interface (English/Russian)
- Adaptive design for mobile devices

## 🛠 Technologies

- **React 18** with TypeScript
- **Material UI** for components
- **TanStack Router** for routing
- **SWR** for data fetching
- **Zustand** for state management
- **i18next** for localization
- **Framer Motion** for animations
- **Vitest** for testing
- **Storybook** for component documentation

## 📦 Installation and Setup

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
# Add your Hetzner API token to .env
# VITE_HETZNER_API_TOKEN=your_api_token_here

# Run development server
pnpm dev

# Build for production
pnpm build
```

> **Note**: The application won't work without a valid Hetzner Cloud API token. Make sure to add your token to the `.env` file before starting the application.
