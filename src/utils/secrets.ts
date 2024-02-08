const secrets = {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: parseInt(process.env.MYSQL_PORT || '3306'),
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_SECURE: process.env.APP_MODE == 'local' ? false : true,
    JWT_MAX_AGE: parseInt(process.env.JWT_MAX_AGE || '1')
}

export default secrets;