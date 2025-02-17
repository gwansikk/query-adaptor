---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Query Adaptor'
  text: 'HTTP client management'
  tagline: 'Creating a powerful HTTP client for anywhere'
  actions:
    - theme: brand
      text: Get Started
      link: /welcome
    - theme: alt
      text: View on GitHub
      link: https://github.com/gwansikk/query-adaptor

features:
  - icon: 🧰
    title: Extension of Fetch API
    details: Provides richer functionality than Fetch API. With features like Instance, Interceptor, and Effect, it minimizes complex configurations and enables flexible HTTP communication.
  - icon: 🧩
    title: Support for Various frameworks
    details: Designed for easy use in various frameworks. Query Fetch works seamlessly in specialized Fetch API frameworks like Next.js, React Native, and Tauri by simply being used as an adapter.
  - icon: ✨
    title: Strong Type Safety
    details: Fully supports TypeScript and requires only the necessary types for precise type inference. This minimizes unnecessary types and ensures robust type safety.
---
