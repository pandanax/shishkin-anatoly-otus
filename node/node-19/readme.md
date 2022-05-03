### Запуск DEV
1. DATABASE из папки `/db`
- `docker-compose up -d`\
поднимает также менеджер базы данных на порту 8081
2. REST API из папки `/api` 
- `npm i -g nodemon`
- `npm i`
- `npm run dev`\
необходим .env файл в корне папки `/api` с содержимым\
`DB_CONN_STRING="mongodb://root:example@127.0.0.1:27017"`\
`TOKEN_SECRET="tokenSecret"`\
`PORT=8080`

3. FRONTEND из папки /ui
- `npm i`
- `npm run dev`





