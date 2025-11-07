# AdGrades Website

This repository contains the source code for the AdGrades marketing site. The project is built with [Vite](https://vitejs.dev/) and [React](https://react.dev/), styled with [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
   The site will be available at the URL printed in the terminal (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` – Starts the development server with hot module replacement.
- `npm run build` – Creates an optimized production build in the `dist` directory.
- `npm run preview` – Serves the production build locally.
- `npm run lint` – Runs ESLint using the configured rules.

## Project Structure

```
├── src/                # Application source code
│   ├── assets/         # Static assets (images, fonts, etc.)
│   ├── components/     # Reusable UI components
│   ├── pages/          # Top-level page components
│   └── main.tsx        # Application entry point
├── public/             # Static files served as-is
├── index.html          # Root HTML file used by Vite
└── tailwind.config.js  # Tailwind CSS configuration
```

## Building for Production

To generate a production build, run:

```bash
npm run build
```

The output will be placed in the `dist` directory. You can serve the production build locally to verify it using:

```bash
npm run preview
```

## Linting

Run ESLint across the codebase with:

```bash
npm run lint
```

## License

This project is proprietary and not licensed for external distribution.
