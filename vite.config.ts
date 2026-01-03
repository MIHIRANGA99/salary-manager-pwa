/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Salary Manager',
        short_name: 'SalaryApp',
        description: 'A simple PWA to manage your monthly salary and expenses.',
        theme_color: '#334155', // Corresponds to bg-slate-700
        background_color: '#0f172a', // Corresponds to bg-slate-900
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        categories: ['finance', 'productivity', 'utilities'],
        // proper IARC rating id if available, otherwise omit or use a placeholder if strict
        // iarc_rating_id: '...', 
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/mobile-1.png',
            sizes: '1080x1920',
            type: 'image/png',
            platform: 'android',
            label: 'Home Screen'
          },
          {
            src: '/screenshots/mobile-2.png',
            sizes: '1080x1920',
            type: 'image/png',
            platform: 'android',
            label: 'Analytics Dashboard'
          },
          {
            src: '/screenshots/desktop-1.png',
            sizes: '1920x1080',
            type: 'image/png',
            platform: 'windows',
            form_factor: 'wide',
            label: 'Desktop View'
          }
        ],
        shortcuts: [
          {
            name: "Add Expense",
            short_name: "Add",
            description: "Quickly add a new expense",
            url: "/?action=add-expense",
            icons: [{ src: "/pwa-192x192.png", sizes: "192x192" }]
          }
        ]
      },
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
