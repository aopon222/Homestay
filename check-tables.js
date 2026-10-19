require('dotenv').config();
const { Sequelize } = require('sequelize');
const s = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    logging: false
});
(async () => {
    const [r] = await s.query(`SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename`);
    console.table(r);
    await s.close();
})();