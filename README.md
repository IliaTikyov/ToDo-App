# To-Do App - With React + Firebase + Tailwind CSS 📝

This is a modern To-Do application built with a modern stack of technologies (React for the frontend, Firebase for authentication, authorization and real-time data persistence, and Tailwind CSS for polished UI).

## Features

Authentication

- Sign-up with email and password
- Google login
- Password reset
- Delete account (with re-auth handling)

Tasks

- CRUD operations
- Drag and Drop reordering (via @dnd-kit)
- Auto-saving structure
- Responsive layout

UI/UX

- Theme toggle (light/dark)
- Fully responsive design
- Animated drawer menu
- Tailwind global theme color
- Modern friendly layout

Firebase

- Firebase auth
- Firebase data storing
- Google OAuth provider
- Secure user metadata handling

## Tech Stack

| Technology        |            Purpose            |
| :---------------- | :---------------------------: |
| React             |           Framework           |
| TailwindCSS       |      Styling and theming      |
| Firebase Auth     |      User login/register      |
| Firebase Database |         Storing tasks         |
| Vite              |          Build tool           |
| React Router      |            Routing            |
| @dnd-kit          | Drag and drop task & ordering |

## Screenshots

Login Page

![Login Page](/public//loginPage.png)

Register Page

![Register Page](/public/registerPage.png)

Reset Password Page

![Reset Password Page](/public/resetPasswordPage.png)

Dashboard Page

![Dashboard Page](/public//dashboardPage.png)

Account Page

![Account Info](/public//accountPage.png)

## Installation

1. Clone the repository

```bash
  git clone https://github.com/IliaTikyov/ToDo-App.git
  cd ToDo\ App/
```

2. Install dependencies

```bash
  npm install
```

3. Set up Environment Variables

Create a .env file in the project root with your Firebase credentials:

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

```

4. Run the development server

```bash
  npm run dev
```

Open in browser: http://localhost:5173/

## Folder Structure

├── src
│ ├── App.jsx
│ ├── assets
│ │ └── react.svg
│ ├── components
│ │ ├── AddingTasks.jsx
│ │ ├── Header.jsx
│ │ ├── Menu.jsx
│ │ ├── TaskCard.jsx
│ │ └── ThemeToggle.jsx
│ ├── index.css
│ ├── main.jsx
│ ├── pages
│ │ ├── Account.jsx
│ │ ├── DashBoard.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── UpdatePassword.jsx
│ └── utils
│ └── ProtectedRoute.jsx
└── vite.config.js

## License

[MIT](https://choosealicense.com/licenses/mit/) License © Ilia Tikyov
