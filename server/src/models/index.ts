import { Sequelize } from "sequelize";

const sequelize = new Sequelize('', process.env.DB_USERNAME ?? '', process.env.DB_PASSWORD ?? '', {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`)

export default sequelize;