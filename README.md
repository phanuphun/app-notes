# Readme 
This repository is a minimal workshop to learn the basics of the Handlebars templating language with Express.js, used to create a sample SSR CRUD web app.
- Tech Stack : Handlebars , Express.js , Typescript , DaisyUI , Tailwind CSS and MongoDB

## directory
```txt
- public/
- src
  - configs
    - hbs.config.ts     # Handlebars engine config 
    - ...
  - controllers/
  - middlewares/
  - models/
  - routers
    - api/
    - web/              # SSR routes
  - schemas/
  - services/
  - types/
  - utils
    - hbs.ts            # Define Handlebars helpers 
  - views/
    - layout
      - main.hbs        # Base layout (Wrapper)
    - partials/         # Components
    - ...
  - app.ts
  - server.ts
- ...
```

## Installation

### 1. Environment Setup
```bash
git clone <repository-url>
cd chat-room

npm install

cp .env.example .env
```

### 2. Development Mode
```bash
npm run dev
```

### 3. Docker Deployment
```bash
docker-compose up -d
```