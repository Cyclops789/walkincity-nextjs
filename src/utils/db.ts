import secrets from "./secrets";
import { escape } from 'sqlstring';

interface IOptions {
    name: string;
    value: string | number;
}

const createDB = `CREATE DATABASE IF NOT EXISTS ${secrets.MYSQL_DATABASE}`;

const createTableVideos = `
CREATE TABLE IF NOT EXISTS videos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vid VARCHAR(255) NOT NULL UNIQUE,
    country VARCHAR(255) NOT NULL,
    place VARCHAR(255) NOT NULL,
    continent VARCHAR(255) NOT NULL,
    weather VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createTableRadios = `
CREATE TABLE IF NOT EXISTS radios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    url VARCHAR(255) NOT NULL UNIQUE,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createTableIcons = `
CREATE TABLE IF NOT EXISTS icons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    time VARCHAR(255) NOT NULL,
    old VARCHAR(255) NOT NULL,
    new VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createTableUsers = `
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const getUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

const getUserByID = `
SELECT * FROM users WHERE id = ?
`;

const getAllUsers = `
SELECT * FROM users
`;

const getUsersByRole = `
SELECT * FROM users WHERE role = ?
`;

const getRoleByID = `
SELECT * FROM roles WHERE id = ?
`;

const getRoleByName = `
SELECT * FROM roles WHERE name = ?
`;

const getAllRoles = `
SELECT * FROM roles
`;

const getAllPermissions = `
SELECT * FROM permissions
`;

const createNewUser = `
INSERT INTO users (username, email, password, role)
VALUES (?, ?, ?, ?);
`;

const createNewRole = `
INSERT INTO roles (name, permissions)
VALUES (?, ?);
`;

const createNewVideo = `
INSERT INTO videos (vid, country, place, weather, type, continent, seekTo, verified)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`;

const createNewCountry = `
INSERT INTO videos (short_name, long_name, border_color, continent)
VALUES (?, ?, ?, ?);
`;

const getAllVideos = `
SELECT * FROM videos
`;

const getVideoById = `
SELECT * FROM videos WHERE id = ?
`;

const getVideoByVid = `
SELECT * FROM videos WHERE vid = ?
`;

const getVideosByVerified = `
SELECT * FROM videos WHERE verified = ?
`;

const getAllCountries = `
SELECT * FROM countries
`;

const getCountryByID = `
SELECT * FROM countries WHERE id = ?
`;

const getCountryByShortName = `
SELECT * FROM countries WHERE short_name = ?
`;

const getAllContinents = `
SELECT * FROM continents
`;

const getVideosByContinent = `
SELECT * FROM videos WHERE continent = ?
`;

const getVideosByWeather = `
SELECT * FROM videos WHERE weather = ?
`;
const getVideosByWeatherAndContinent = `
SELECT * FROM videos WHERE weather = ? AND continent = ?
`;

const getAllRadios = `
SELECT * FROM radios
`;

const getAllIcons = `
SELECT * FROM icons
`;

const updateField = (table: string, id: number | string, options: IOptions[] = []): string => {
    const setClauses = options.map((option) => `${option.name} = ${escape(`${option.value}`)}`).join(', ');
    
    return `UPDATE ${table} SET ${setClauses} WHERE id = ${id}`;
}

const query = {
    createDB,
    createTableVideos,
    createTableRadios,
    createTableIcons,
    getAllContinents,
    createTableUsers,
    getVideosByContinent,
    getVideosByWeather,
    getVideosByWeatherAndContinent,
    getAllRadios,
    getVideoById,
    createNewRole,
    getVideoByVid,
    getAllCountries,
    getUserByEmail,
    getAllRoles,
    getAllPermissions,
    getUserByID,
    getRoleByID,
    getAllUsers,
    getCountryByID,
    getUsersByRole,
    getRoleByName,
    createNewCountry,
    getAllVideos,
    getAllIcons,
    createNewUser,
    createNewVideo,
    getCountryByShortName,
    getVideosByVerified,
    updateField
};

export default query;