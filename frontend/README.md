# Pasos para configurar el proyecto después de clonarlo

# Nodemon

1. Es necesario instalar nodemon, ejecuta el cmd de windows como administrador y escribe el comando:
```sh
npm install -g nodemon
```

2. Si se instalo bien debes de ejecutar el comando:
```sh
nodemon -v
```
y te deberia de aparecer la versión de nodemon.

# Backend

1. Abre la terminal en VS Code y asegúrate de estar en la carpeta "Carti", deberias de ver algo como esto:
```sh
C:\Users\tu-usuario\Carti
```
2. Ejecuta el siguiente comando para acceder al directorio del backend: 
```sh
cd backend
```
3. Instala las dependencias con:
```sh
npm install
```
4. Para verificar que todo se instaló correctamente, ejecuta:
```sh
npm list
```

Deberías ver las siguientes dependencias:

```sh
  ├── argon2@0.41.1
  ├── cors@2.8.5
  ├── dotenv@16.4.7
  ├── express-session@1.18.1
  ├── express@4.21.2
  ├── mssql@11.0.1
  └── sequelize@6.37.5
```

# Frontend

1. Vuelve a la carpeta raíz del proyecto ejecutando.
```sh
cd ..
```
2. Accede al directorio del frontend con: 
```sh
cd frontend
```
3. Instala las dependencias con:
```sh
npm install
```
4. Para verificar que todo se instaló correctamente, ejecuta:
```sh
npm list
```

Deberías ver las siguientes dependencias:

```sh
  ├── @eslint/js@9.20.0
  ├── @reduxjs/toolkit@2.5.1
  ├── @tailwindcss/vite@4.0.4
  ├── @types/react-dom@19.0.3
  ├── @types/react@19.0.8
  ├── @vitejs/plugin-react@4.3.4
  ├── axios@1.7.9
  ├── eslint-plugin-react-hooks@5.1.0
  ├── eslint-plugin-react-refresh@0.4.18
  ├── eslint@9.20.0
  ├── globals@15.14.0
  ├── react-dom@19.0.0
  ├── react-redux@9.2.0
  ├── react-router-dom@7.1.5
  ├── react@19.0.0
  ├── tailwindcss@4.0.4
  ├── typescript-eslint@8.23.0
  ├── typescript@5.7.3
  └── vite@6.1.0
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
