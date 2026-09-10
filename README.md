# Copynsync — Alpha Testing Waitlist

Official waitlist and closed alpha testing application for **Copynsync**.

## Overview

Copynsync connects Android, macOS, Windows, and Linux over your local network so all your devices feel like one:
- **Instant Clipboard Sync**: Copy on your phone, paste on your computer.
- **High-Speed File Transfer**: Stream large files directly at full Wi-Fi router speeds without the internet.
- **Notification Mirroring**: Mirror phone notifications straight to your desktop.
- **Mouse & Keyboard Sharing**: Control multiple computers seamlessly with a single mouse.
- **100% Private**: Zero cloud servers, end-to-end peer-to-peer on your local network.

## Getting Started

### Development
```bash
# Install dependencies
pnpm install

# Start local dev server (port 3001)
pnpm run dev
```

The application will be accessible at:
- `http://localhost:3001/alpha-testing`
- `http://localhost:3001` (redirects to `/alpha-testing`)

### Build for Production
```bash
pnpm run build
pnpm run start
```

## Environment Variables

Copy `.env.example` to `.env.local` and set:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```
