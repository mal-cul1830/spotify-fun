const CLIENT_ID = 'bd4475f17697443cae50bda901c785dc';
const CLIENT_SECRET = '4fa5de6ddc4c4450b2571896be991e7d';
const REDIRECT_URI = 'http://localhost:3000';
const OLD_ACCESS_TOKEN = "BQB-AzyF9Y6aBtIqOMBI9E2ltImZc8vVgIeGlsMsAX6czkIc8U1OJxp3O0gAJQnL7aqAY5rQjmSgW4N5QXJhzh7etU18u3TS1FZ_Jv0gQL9MwPopv3bencDGG9RMQTaM-SzBeecgi7SxpljLgW3d30uQ-WMlDmPxYWsDq31cLggMfFy220AUuBa3eZoHTK7EvNAPJMbX2wG9fboWl6L1Gds"
var ACCESS_TOKEN;
var REFRESH_TOKEN = "AQC9osLlHUbZsUYs1geuRLtPwOm27jC7LmpVUY_Cg6XAu_YZlUkaWdHGTJv-XAwBUkHwJjmG2CvlKeyHLHfO9-cyj3-yGJi-aaB37XTbwFEpKHv-S8Ydp1tLua_hc0nmqJg";

var getArtists = (token, term, n) => {
    if(!term)
        term = 'short_term';
    if(!n)
        n = 10;
    const END_POINT = 'https://api.spotify.com/v1/me/top/artists';
    const URL = `${END_POINT}`;
    const authOptions = {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    const data = fetch(URL, authOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data.items)
        return data;
    });

    console.log(data);
    return data;
}

// 2. Create a button that users can click to authenticate
const loginButton = document.createElement('button');
loginButton.textContent = 'Log in with Spotify';
loginButton.addEventListener('click', () => {
    // 3. Redirect the user to the Spotify authorization page
    const scopes = 'user-read-private user-read-email user-top-read'; // Set the scopes you need access to
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}`;
    window.location = authUrl;
});

// 4. Add the button to your page
document.body.appendChild(loginButton);

// 5. Handle the callback after the user authenticates
if (window.location.search.includes('code')) {
    const code = new URLSearchParams(window.location.search).get('code');
    const authorization_code = 'refresh_token'
    const authOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`
        },
        body: `grant_type=${authorization_code}&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&refresh_token=${REFRESH_TOKEN}`
    };
    fetch('https://accounts.spotify.com/api/token', authOptions)
        .then(response => response.json())
        .then(data => {
            const accessToken = data.access_token;
            ACCESS_TOKEN = accessToken;
            const refreshToken = data.refresh_token;
            REFRESH_TOKEN = refreshToken;
            getArtists(accessToken);
        });
}

exports.ACCESS_TOKEN = ACCESS_TOKEN;
exports.getArtists = getArtists;