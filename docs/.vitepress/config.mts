import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Query Adaptor',
  description: 'Powerful and flexible Fetch API Adaptor Library',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/welcome' },
    ],
    sidebar: [
      {
        text: 'INTRODUCTION',
        items: [
          { text: 'Welcome', link: '/welcome' },
          { text: 'Why Query Adaptor?', link: '/why-query-adaptor' },
          { text: 'Quickstart', link: '/quickstart' },
        ],
      },
      {
        text: 'APIS',
        items: [
          {
            text: 'query',
            link: '/query',
          },
          {
            text: 'createQueryAdaptor',
            link: '/create-query-adaptor',
          },
          {
            text: 'fetchOptions',
            link: '/fetch-options',
          },
        ],
      },
      {
        text: 'GUIDES',
        items: [{ text: 'Next.js' }, { text: 'Tauri' }],
      },
    ],
    socialLinks: [
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/query-adaptor',
      },
      { icon: 'github', link: 'https://github.com/gwansikk/query-adaptor' },
    ],
    footer: {
      copyright: 'MIT © gwansikk',
    },
    search: {
      provider: 'local',
    },
  },
});
