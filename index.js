const { google } = require('googleapis');

// Load your OAuth 2.0 credentials
const credentials = require('./client_secret.json');

const oAuth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  'http://localhost:3000/oauth2callback' // Your redirect URI
);

// Generate the authorization URL
const scopes = ['https://www.googleapis.com/auth/gmail.send'];
const url = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('Authorize this app by visiting this url:', url);
