# selfstudy_React.JS_GetStart
Study from https://www.youtube.com/watch?v=W8vG4iOY8Hc&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=35
### Cloning from
https://bookingcare.vn/

### Các câu lệnh
 1. Cài đặt các thư viện: sequlize-cli, sequelize và mysql2
npm install --save-dev sequelize-cli@6.2.0
npm install --save mysql2@2.2.5
npm install --save sequelize@6.6.2

 2. Thêm file .sequelizerc tại thư mục root
Nội dung file .sequelizerc
const path = require('path');
module.exports = {
  'config': path.resolve('./src/config', 'config.json'),
  'migrations-path': path.resolve('./src', 'migrations'),
  'models-path': path.resolve('./src', 'models'),
  'seeders-path': path.resolve('./src', 'seeders')
}

 Tại thư mục root, sử dụng câu lệnh: node_modules/.bin/sequelize init

 3. Tạo model: 
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

 4: Tạo migrations:
npx sequelize-cli db:migrate

5. Tạo Seeder: npx sequelize-cli seed:generate --name demo-user

🐱‍🚀 Tài liệu tham kảo sử dụng:
- https://sequelize.org/master/manual/migrations.html#installing-the-cli
- https://mherman.org/blog/node-postgres-sequelize/
## Lệnh tạo database
npx sequelize-cli db:migrate
## Lệnh seed dữ liệu

## Thiết kế bảng CSDL
https://docs.google.com/spreadsheets/d/1npm75ts9y-bJGAwEUtVEFojJQ4nFCH_lIU0poA0wVjM_lk/edit#gid=0
