export const verifyRequest = (
    country: string, 
    place: string, 
    videoID: string, 
    base_url: string, 
    verification_token: string
) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Request Verification</title>
        <style>
            /* Reset styles */
            body, html {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            /* Container styles */
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #f9f9f9;
            }
            /* Header styles */
            .header {
                background-color: #d50c2d;
                color: #fff;
                padding: 10px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            /* Content styles */
            .content {
                padding: 20px;
                background-color: #fff;
                border-radius: 0 0 8px 8px;
            }
            /* Button styles */
            .btn {
                display: inline-block;
                background-color: #d50c2d;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin-top: 20px;
            }
            .btn:hover {
                background-color: #ac0b26;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
                <h2>Request Verification</h2>
            </div>
            <div class="content">
                <p>Click on the button below to verify the request for:</p>
                <p>${country}, ${place}</p>
                <p>Video: <a style="color:red" target="_blank" href="https://www.youtube.com/watch?v=${videoID}">${videoID}</a></p>
                <a href="${base_url}/request/verify/${verification_token}" style="color:white;" class="btn">Verify request</a>
                <p></p>
                <p>If you can't click on the button then copy this link to your browser <a href="${base_url}/request/verify/${verification_token}" style="color:red" target="_blank">${base_url}/request/verify/${verification_token}</a></p>
                <p></p>
                <p>If you did not send this request, please ignore this email.</p>
                <a href="${base_url}" style="font-weight: bold; color: black; text-decoration: none;">Walkin<span style="font-size: 30px; color:red; border-radius: 25px">.</span>City</a>
            </div>
        </div>
        </body>
        </html>
`;
};

export const requestAccepted = (
    base_url: string, 
    countryID: number,
    videoID: number,
) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Request Accepted</title>
        <style>
            /* Reset styles */
                body, html {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            /* Container styles */
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #f9f9f9;
            }
            /* Header styles */
            .header {
                background-color: #d50c2d;
                color: #fff;
                padding: 10px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            /* Content styles */
            .content {
                padding: 20px;
                background-color: #fff;
                border-radius: 0 0 8px 8px;
            }
            /* Button styles */
            .btn {
                display: inline-block;
                background-color: #d50c2d;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin-top: 20px;
            }
            .btn:hover {
                background-color: #ac0b26;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
                <h2>Request Accepted</h2>
            </div>
            <div class="content">
                <p>Congratulation! your requested video has been accepted.</p>
                <a href="${base_url}/?v=${videoID}&c=${countryID}" style="color:white;" class="btn">Take me in!</a>
                <p></p>
                <p>If you can't click on the button then copy this link to your browser <a href="${base_url}/?v=${videoID}&c=${countryID}" style="color:red" target="_blank">${base_url}/?v=${videoID}&c=${countryID}</a></p>
                <p></p>
                <a href="${base_url}" style="font-weight: bold; color: black; text-decoration: none;">Walkin<span style="font-size: 30px; color:red; border-radius: 25px">.</span>City</a>
            </div>
        </div>
        </body>
        </html>
`;
};

export const requestDeclined = (
    base_url: string, 
    reason: string,
    country: string, 
    place: string, 
    videoID: string, 
) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Request Declined</title>
        <style>
            /* Reset styles */
            body, html {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            /* Container styles */
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #f9f9f9;
            }
            /* Header styles */
            .header {
                background-color: #d50c2d;
                color: #fff;
                padding: 10px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            /* Content styles */
            .content {
                padding: 20px;
                background-color: #fff;
                border-radius: 0 0 8px 8px;
            }
            /* Button styles */
            .btn {
                display: inline-block;
                background-color: #d50c2d;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin-top: 20px;
            }
            .btn:hover {
                background-color: #ac0b26;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
                <h2>Request Declined</h2>
            </div>
            <div class="content">
                <p>Sadly your requested video has been declined, see below for the reason.</p>
                <p></p>
                <p>Request: <a style="color:red" target="_blank" href="https://www.youtube.com/watch?v=${videoID}">${country}, ${place}</a></p>
                <p>Reason: ${reason}</p>
                <p></p>
                <a href="${base_url}" style="font-weight: bold; color: black; text-decoration: none;">Walkin<span style="font-size: 30px; color:red; border-radius: 25px">.</span>City</a>
            </div>
        </div>
        </body>
        </html>
`;
};

export const accountCreated = (
    username: string,
    email: string,
    password: string,
    base_url: string
) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Created</title>
    <style>
        /* Reset styles */
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        /* Container styles */
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        /* Header styles */
        .header {
            background-color: #d50c2d;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        /* Content styles */
        .content {
            padding: 20px;
            background-color: #fff;
            border-radius: 0 0 8px 8px;
        }
        /* Button styles */
        .btn {
            display: inline-block;
            background-color: #d50c2d;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .btn:hover {
            background-color: #ac0b26;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="header">
            <h2>Account created</h2>
        </div>
        <div class="content">
            <p>Here is your account credentials, Please change your password immediately once you have logged in.</p>
            <p></p>
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>Password: ${password}</p>
            <p></p>
            <a href="${base_url}/auth/login" style="color:white;" class="btn">Log in</a>
            <p></p>
            <p>If you can't click on the button then copy this link to your browser <a href="${base_url}/auth/login" style="color:red" target="_blank">${base_url}/auth/login</a></p>
            <p></p>
            <a href="${base_url}" style="font-weight: bold; color: black; text-decoration: none;">Walkin<span style="font-size: 30px; color:red; border-radius: 25px">.</span>City</a>
        </div>
    </div>
    </body>
    </html>
    `;
};