import secrets from "./secrets";
import { escape } from 'sqlstring';

interface IOptions {
    name: string;
    value: string | number | boolean;
}

const createDB = `CREATE DATABASE IF NOT EXISTS ${secrets.MYSQL_DATABASE}`;

const getUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

const getUserByID = `
SELECT *, 'hidden' AS password FROM users WHERE id = ?
`;

const getAllUsers = `
SELECT *, 'hidden' AS password FROM users
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

const getAllVideosRequests = `
SELECT *, 'hidden' AS by_email FROM videos_requests
`;

const getAllAvailableVideosRequests = `
SELECT *, 'hidden' AS by_email FROM videos_requests WHERE action IS NULL AND verified = 1;
`;

const getVideoRequestByID = `
SELECT * FROM videos_requests WHERE id = ?
`;

const getVideoRequestByVid = `
SELECT * FROM videos_requests WHERE vid = ?
`;

const getVideoRequestByEmail = `
SELECT * FROM videos_requests WHERE by_email = ?
`;

const createNewVideosRequests = `
INSERT INTO videos_requests (vid, country, place, weather, type, seekTo, continent, by_email)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`;

const getAllRoles = `
SELECT * FROM roles
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

const createNewToken  = `
INSERT INTO tokens (token, videoId)
VALUES (?, ?);
`;

const getTokenByToken = `
SELECT * FROM tokens WHERE token = ?
`;

const getAllVideos = `
SELECT * FROM videos
`;

const getAllVerifiedVideos = `
SELECT * FROM videos WHERE verified = 1
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

const getCountryByLongName = `
SELECT * FROM countries WHERE long_name = ?
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
    getAllContinents,
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
    getUserByID,
    getRoleByID,
    getAllVideosRequests,
    getVideoRequestByVid,
    getTokenByToken,
    getVideoRequestByID, 
    getVideoRequestByEmail,
    createNewVideosRequests,
    getAllUsers,
    getCountryByID,
    getUsersByRole,
    createNewToken,
    getRoleByName,
    createNewCountry,
    getAllVideos,
    getAllVerifiedVideos,
    getAllIcons,
    createNewUser,
    createNewVideo,
    getAllAvailableVideosRequests,
    getCountryByShortName,
    getVideosByVerified,
    getCountryByLongName,
    updateField
};

export default query;