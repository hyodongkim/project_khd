var options = {
  host: "hyodong.AKIA4MTWJ6LHJNEKOJSZ.us-east-2.rds.amazonaws.com",
  user: "root",
  password: "root",
  database: "node",
  port: 3306,

  clearExpired: true,
  checkExpirationInterval: 10000,
  expiration: 1000 * 60 * 60 * 2,
};

module.exports = options;
