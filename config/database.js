module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '82.180.130.53'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'arpitools_api'),
      user: env('DATABASE_USERNAME', 'arpitools_root'),
      password: env('DATABASE_PASSWORD', 'Lks534%1'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
