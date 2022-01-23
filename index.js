const fs = require('fs');
const path = require('path');

const { google } = require('googleapis');

const KEYFILEPATH = 'e:\\GoogleDriveApi\\ServiceAccountCred.json';

const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
   keyFile: KEYFILEPATH,
   scopes: SCOPES,
});

const filePath = path.join(__dirname, 'girl.jpg');

async function createAndUploadFile(auth) {
   const driveService = google.drive({
      version: 'v3',
      auth,
   });

   let fileMetaData = {
      name: 'girl.jpg',
   };

   let media = {
      mimeType: 'image/jpg',
      body: fs.createReadStream(filePath),
   };

   let response = await driveService.files.create({
      resource: fileMetaData,
      media,
      fields: 'id',
   });

   switch (response.status) {
      case 200:
         console.log('File created id:', response.data.id);
         break;
      default:
         console.error('Error creating file, ' + response.errors);
         break;
   }
}

createAndUploadFile(auth).catch(console.error);
