# MEAN Stack Admin Panel

An administrative dashboard built with Angular 17, featuring user authentication, post management, and user analytics. The application uses Angular Signals for state management and provides a modern, responsive user interface.

## Features

### Authentication
- User registration and login system
- Google OAuth integration 
- Password reset functionality with email confirmation 
- Form validation 

### Dashboard
- Post management (Create, Read, Update, Delete)
- Post filtering by title 
- Post preview functionality
- Role-based access control (users can only edit/delete their own posts)

### Analytics
- User statistics and insights
- Post count tracking per user
- Total registered users overview

## Project Structure

```
mean-sandBox-FE/
├── src/
│   ├── app/
│   │   ├── admin-layout/       # Admin dashboard components
│   │   ├── shared/            # Shared components, services, and utilities
│   │   ├── app.component.*    # Root component
│   │   ├── app.config.ts      # App configuration
│   │   ├── app.routes.ts      # Route definitions
│   │   └── _redirects         # Routing redirects
│   ├── assets/               # Static files (images, icons)
│   ├── environments/         # Environment configurations
│   ├── styles/              # Global styles and themes
│   ├── main.ts              # Application entry point
│   └── index.html           # Main HTML file
├── .github/                 # GitHub workflows and CI/CD
├── .vscode/                # VS Code configuration
├── dist/                   # Production build output
├── Dockerfile              # Docker configuration
├── eslint.config.js        # ESLint configuration
├── proxy.conf.json         # Proxy configuration
├── angular.json            # Angular CLI configuration
├── package.json           # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Tech Stack

<p align='center'>
 <img style="text-decoration:none" src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" />&nbsp;&nbsp;
 <img alt="GitHub Repo stars" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">&nbsp;&nbsp;
 <img alt="GitHub Repo stars" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">&nbsp;&nbsp;
 <img alt="GitHub Repo stars" src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white">&nbsp;&nbsp;
 <img alt="GitHub Repo stars" src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">&nbsp;&nbsp;
</p>

- **Framework**: Angular 17
- **State Management**: Angular Signals
- **UI Libraries**: 
  - Angular Material
  - Bootstrap Grid System
- **Features**:
  - Skeleton Loading
  - Responsive Design
  - Type-safe Development

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/brolo1313/mean-sandBox-FE.git
   # or using SSH
   git clone git@github.com:brolo1313/mean-sandBox-FE.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

For detailed development instructions, please refer to the [Angular CLI Overview and Command Reference](https://angular.io/cli).

## Responsive Design

The application is fully responsive and optimized for various screen sizes, providing a consistent user experience across desktop and mobile devices.

## DEMO

https://education-io.vercel.app/

BACKEND SOURCE
https://github.com/brolo1313/mean-sandBox-BE
