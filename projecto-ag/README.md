# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Estructura de carpetas(chatgpt):

my-react-app/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── assets/
│       └── images/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       ├── components/
│   │       └── pages/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── ...
│   ├── hooks/
│   │   └── useCustomHook.js
│   ├── contexts/
│   │   └── UserContext.jsx
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── index.js
├── .gitignore
├── package.json
├── README.md
├── vite.config.js
└── yarn.lock / package-lock.json