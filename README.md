# Atom Starter Kit

**Atom Starter Kit** is a modern, highly customizable starter kit that combines the power of **Laravel 12**, **Inertia.js**, **React**, **TypeScript**, **Tailwind CSS 4**, and **Shadcn UI** to help you kickstart your next project with best practices and essential features out of the box.

<img width="1920" height="825" alt="image" src="https://github.com/user-attachments/assets/70dd8161-43c1-4588-a8a9-505d6300e632" />

## ⚡️ Key Features

### 🔐 Authentication & Security
- User registration and login  
- Password reset via email  
- Email verification  
- **Two-factor authentication (2FA)** with QR codes and recovery codes
- Light, dark, and system theme support  

### 👤 User Settings
- Update profile information  
- Change password  
- **Two-factor authentication management**

### 🔒 Protected Routes
- Dashboard  
- Settings pages  

## 🎨 Easy Customization

### CSS Variables System
The starter kit is built with **Tailwind CSS 4** and uses a comprehensive CSS variables system in `resources/css/app.css`. All components automatically adapt to your custom theme by simply modifying the CSS variables.

**Key customization points:**
- **Colors**: Primary, secondary, accent, destructive, and chart colors
- **Sidebar**: Dedicated sidebar theming variables
- **Border radius**: Consistent border radius system
- **Dark mode**: Complete dark theme support

### Visual Theme Editor
I recommend using **[TweakCN Theme Editor](https://tweakcn.com/editor/theme)** for easy visual customization:

1. Visit the theme editor to customize your design visually
2. Export the generated CSS variables
3. Replace the variables in `resources/css/app.css`
4. All components will automatically update to match your new theme

### Component System
All UI components in `resources/ts/components/ui/` are built with Shadcn UI and are fully customizable. They automatically inherit your CSS variables, so theme changes are applied consistently across the entire application.

## 🛠️ Development Tools & Testing

### Testing
- **Pest PHP** - Configured for writing expressive tests
- **Example tests** - Ready-to-use test examples for both Feature and Unit tests

### Code Quality & Standards
- **ESLint** - JavaScript/TypeScript linting with React rules
- **Prettier** - Code formatting with Tailwind CSS plugin
- **PHP CS Fixer (Pint)** - PHP code formatting
- **TypeScript** - Static type checking

### Git Hooks & Automation
- **Husky** - Git hooks for pre-commit validation
- **Commitlint** - Conventional commit message validation
- **Semantic Release** - Automated versioning and changelog generation

### CI/CD Pipeline
- **GitHub Actions** - Automated testing and deployment
  - `ci.yml` - Runs linting, formatting, and tests
  - `release.yml` - Automated releases with semantic versioning
- **Automatic validation** - Frontend and backend code quality checks
- **Changelog management** - Automatic CHANGELOG.md updates

## 🚀 Quick Start

### Create a New Project
```bash
laravel new example-app --using=rmirandasv/atom-starter-kit
```

### For New Applications
We recommend cleaning the `CHANGELOG.md` file when starting a new project to remove the starter kit's history.

## 🧰 Tech Stack

- **Laravel 12** – Backend framework  
- **Inertia.js** – SPA bridge for Laravel + React  
- **React** – Frontend library  
- **TypeScript** – Typed JavaScript  
- **Tailwind CSS 4** – Utility-first CSS framework with CSS variables  
- **Shadcn UI** – Accessible and composable UI components  

## 🚀 Why Atom Starter Kit?

Atom Starter Kit is built for **speed, productivity, and customization**. Whether you're building a SaaS, dashboard, internal tool, or any Laravel-based app with React, this template provides a rock-solid starting point with:

- **Ready-to-customize theme system** - Change colors, fonts, and styling with CSS variables
- **Production-ready authentication** - Including robust two-factor authentication
- **Modern development experience** - TypeScript, hot reloading, and best practices
- **Accessible components** - Built with Shadcn UI for better UX
- **Dark mode support** - Out of the box with automatic theme switching
- **Complete testing setup** - Pest PHP configured with example tests
- **Code quality tools** - ESLint, Prettier, and automated CI/CD pipeline
- **Automated releases** - Semantic versioning and changelog management

Focus on your business logic instead of boilerplate!
