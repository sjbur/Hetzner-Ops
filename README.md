# Hetzner Cloud Admin Panel

Web interface for managing Hetzner Cloud infrastructure. Allows you to manage servers, snapshots, and SSH keys through a user-friendly interface.

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

# Run development server
pnpm dev

# Build for production
pnpm build
```
