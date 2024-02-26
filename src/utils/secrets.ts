const secrets = {
    APP_MODE: process.env.APP_MODE,
    APP_URL: process.env.APP_URL,
    
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: parseInt(process.env.MYSQL_PORT || '3306'),
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,

    SMTP_HOSTNAME: process.env.SMTP_HOSTNAME,
    SMTP_TLS: (process.env.SMTP_TLS == '1'),
    SMTP_PORT: parseInt(process.env.SMTP_PORT || '465'),

    SMTP_VERIFY_USER: process.env.SMTP_VERIFY_USER,
    SMTP_VERIFY_PASSWORD: process.env.SMTP_VERIFY_PASSWORD,
    
    SMTP_ADMIN_USER: process.env.SMTP_ADMIN_USER,
    SMTP_ADMIN_PASSWORD: process.env.SMTP_ADMIN_PASSWORD,
}

export default secrets;