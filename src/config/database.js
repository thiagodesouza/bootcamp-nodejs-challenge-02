module.exports = {
  dialect: 'postgres',
  host: process.env.PG_HOST || '127.0.0.1',
  username: process.env.PG_USER || 'docker',
  password: process.env.PG_PASS || 'docker',
  database: process.env.PG_DB || 'gonode_m2',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
