module.exports = {
    "database": process.env.DATABASE_URL || 'postgres://localhost:5432/postgres',
    "port": process.env.PORT || 3000,
    "secretKey": "myPassword"
};

