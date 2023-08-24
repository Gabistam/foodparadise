require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },

  test: {
    dialect: 'sqlite',
    storage: ':memory:'
    },
    
  production: {
    // Configuration pour l'environnement de production
    // Par exemple, utiliser DATABASE_URL pour Heroku
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
