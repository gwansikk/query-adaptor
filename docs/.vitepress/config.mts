import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '🔌🌐 Query Fetch',
  description: 'Powerful and flexible Fetch API Adaptor Library',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/what-is-query-fetch' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [{ text: 'What is Query Fetch?', link: '/what-is-query-fetch' }],
      },
      {
        text: 'APIs',
        items: [
          {
            text: 'queryFetch',
            link: '/query-fetch',
          },
          {
            text: 'createQueryFetch',
            link: '/create-query-fetch',
          },
          {
            text: 'fetchOptions',
            link: '/fetch-options',
          },
        ],
      },
      {
        text: 'Framework Guides',
        items: [
          { text: 'React Query' },
          { text: 'NEXT.js' },
          { text: 'React Native' },
          { text: 'Tauri' },
        ],
      },
    ],
    socialLinks: [
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/@query-fetch/core',
      },
      { icon: 'github', link: 'https://github.com/gwansikk/query-fetch' },
    ],
    footer: {
      copyright: 'MIT © gwansikk',
    },
  },
});
