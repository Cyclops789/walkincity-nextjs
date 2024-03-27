import secrets from "./secrets";
import { escape } from 'sqlstring';

interface IOptions {
    name: string;
    value: string | number | boolean | null | undefined;
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

const getAllVideosBugs = `
SELECT id, vid, reason, action FROM videos_bugs WHERE hide = 0
`;

const createNewVideoBug = `
INSERT INTO videos_bugs (vid, reason, by_email, action)
VALUES (?, ?, ?, ?);
`;

const getVideoBugById = `
SELECT id, vid, reason, action FROM videos_bugs WHERE id = ?
`;

const getVideoBugByIdWithEmail = `
SELECT id, vid, reason, action, by_email FROM videos_bugs WHERE id = ?
`;

const getAllVideosRequests = `
SELECT *, 'hidden' AS by_email FROM videos_requests
`;

const getAllAvailableVideosRequests = `
SELECT *, 'hidden' AS by_email FROM videos_requests WHERE action IS NULL AND verified = 1;
`;

const getAllAcceptedVideosRequests = `
SELECT *, 'hidden' AS by_email FROM videos_requests WHERE action = 'accept' AND verified = 1;
`;

const getAllRejectedVideosRequests = `
SELECT *, 'hidden' AS by_email FROM videos_requests WHERE action = 'reject' AND verified = 1;
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
INSERT INTO videos (vid, country, place, weather, type, continent, seekTo, verified, latitude, longitude)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
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
SELECT * FROM videos WHERE hide = 0
`;

const getAllVerifiedVideos = `
SELECT * FROM videos WHERE verified = 1 AND hide = 0
`;

const getAllVerifiedVideosForProduction = `
SELECT id, vid, country, place, weather, type, continent, seekTo, latitude, longitude FROM videos WHERE verified = 1 AND hide = 0
`;

const getVideoById = `
SELECT * FROM videos WHERE id = ? AND hide = 0
`;

const getVideoByVid = `
SELECT * FROM videos WHERE vid = ? AND hide = 0
`;

const getVideosByVerified = `
SELECT * FROM videos WHERE verified = ? AND hide = 0
`;

const getVideosOfThisMonth = `
SELECT created_on FROM videos WHERE YEAR(created_on) = YEAR(CURRENT_DATE()) AND MONTH(created_on) = MONTH(CURRENT_DATE()) AND verified = 1
`;

const getVideosRequestsOfThisMonth = `
SELECT created_on FROM videos_requests WHERE YEAR(created_on) = YEAR(CURRENT_DATE()) AND MONTH(created_on) = MONTH(CURRENT_DATE()) AND verified = 1
`;

const getAllCountries = `
SELECT * FROM countries
`;

const getWeekVideosRequestsByEmail = `
SELECT * FROM videos_requests WHERE by_email = ? AND created_on >= DATE_SUB(NOW(), INTERVAL 7 DAY)
`;

const getAllPages = `
SELECT * FROM pages
`;

const getAllEnabledPages = `
SELECT * FROM pages WHERE enabled = 1
`;

const getPageById = `
SELECT * FROM pages WHERE id = 1
`;

const getPageByName = `
SELECT * FROM pages WHERE id = 1
`;

const getCountryByID = `
SELECT * FROM countries WHERE id = ?
`;

const createNewNotification = `
INSERT INTO notifications (user_id, message, link) VALUES (?, ?, ?)
`;

const getNotificationsByUserID = `
SELECT id, message, is_read, link FROM notifications WHERE user_id = ?
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
SELECT * FROM videos WHERE continent = ? AND hide = 0
`;

const getVideosByWeather = `
SELECT * FROM videos WHERE weather = ? AND hide = 0
`;
const getVideosByWeatherAndContinent = `
SELECT * FROM videos WHERE weather = ? AND continent = ? AND hide = 0
`;

const getAllRadios = `
SELECT * FROM radios
`;

const getAllIcons = `
SELECT * FROM icons
`;

const updateField = (table: string, id: number | string, options: IOptions[] = [], additionalQuery: string = ''): string => {
    const setClauses = options.map((option) => `${option.name} = ${escape(`${option.value}`)}`).join(', ');
    
    return `UPDATE ${table} SET ${setClauses} WHERE id = ${id} ${additionalQuery}`;
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
    getAllVideosBugs,
    getUserByID,
    getRoleByID,
    getAllVideosRequests,
    createNewNotification,
    getAllEnabledPages,
    getAllPages,
    getPageById,
    getPageByName,
    getNotificationsByUserID,
    getVideosRequestsOfThisMonth,
    getVideosOfThisMonth,
    getVideoRequestByVid,
    getTokenByToken,
    getVideoRequestByID, 
    getVideoRequestByEmail,
    createNewVideosRequests,
    getAllUsers,
    createNewVideoBug,
    getVideoBugByIdWithEmail,
    getCountryByID,
    getUsersByRole,
    getVideoBugById,
    getWeekVideosRequestsByEmail,
    getAllAcceptedVideosRequests,
    getAllRejectedVideosRequests,
    createNewToken,
    getRoleByName,
    createNewCountry,
    getAllVideos,
    getAllVerifiedVideos,
    getAllVerifiedVideosForProduction,
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