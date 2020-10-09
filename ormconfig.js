require('dotenv').config();

const devConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.AMAZON_RDS_HOST,
    port: 5432,
    username: process.env.AMAZON_RDS_USER,
    password: process.env.AMAZON_RDS_PASS,
    database: process.env.AMAZON_RDS_DATABASE,
    "entities": [
      "./src/modules/**/typeorm/entities/*.ts"
    ],
    "migrations": [
      "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  }
];

module.exports = devConfig;