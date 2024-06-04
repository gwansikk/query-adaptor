import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '🔗 chain',
  description: 'Lightweight and Easy-to-Use Fetch API Extension Library',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [{ text: 'Markdown Examples', link: '/markdown-examples' }],
      },
    ],

    socialLinks: [
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/@gwansikk/server-chain',
      },
      { icon: 'github', link: 'https://github.com/gwansikk/chain' },
    ],
  },
});
