# Project "Nest.js + Angular"

## Project structure

```
project-root/
│
├── api/             # Folder with a server side (Nest.js приложение)
│   ├── src/         # Initial files for backend part
│   ├── package.json # Dependencies and scripts for a server side
│   └── ...          # Other Nest.js files
│
└── front/           # Frontend part foder (Angular)
    ├── src/         # Initial files for Frontend part
    ├── package.json # Dependencies and scripts for a Frontend side
    └── ...          # Other Angular files
```

## Project run

### 1. Run server side (Nest.js)

Move to the folder `api/`:

```bash
cd api
```

Install dependencies:

```bash
npm install
```

Start the server in dev mode:

```bash
npm run start:dev
```

The server side will be available in port 3000 [http://localhost:3000](http://localhost:3000).

### 2. Frontend part start (Angular)

Open the second terminal window and move to the folder `front/`:

```bash
cd front
```

Install dependencies:

```bash
npm install
```

Run the frontend part:

```bash
npm start
```

The server side will be available in address [http://localhost:4200](http://localhost:4200).

### 3. Project usage

Now you can use project "Nest.js + Angular". The server side works on posrt 3000, but client side works on port 4200. Open the browser and move to the address  [http://localhost:4200](http://localhost:4200).

## Дополнительная информация

- Для настройки базы данных или других конфигурационных параметров серверной части, пожалуйста, отредактируйте соответствующие файлы в папке `backend/`.
- Для изменения или расширения функционала клиентской части, редактируйте файлы в папке `frontend/`.

---