export const dbConfig = {
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: parseInt(process.env.PGPORT || 5432, 10),
  dialect: process.env.DIALECT,
  logging: false,
};

// sequelize cli required environments
export const production = dbConfig;
export const development = dbConfig;
