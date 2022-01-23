const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
// const { file } = require('googleapis/build/src/apis/file');

const KEYFILEPATH = 'e:\\GoogleDriveApi\\ServiceAccountCred.json';

const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
   keyFile: KEYFILEPATH,
   scopes: SCOPES,
});

const drive = google.drive({
   version: 'v3',
   auth,
});
const filePath = path.join(__dirname, 'girl.jpg');

async function uploadFile() {
   try {
      const response = await drive.files.create({
         requestBody: {
            name: 'beautifulgirl.jpg',
            mimeType: 'image/jpg',
         },
         media: {
            mimeType: 'image/jpg',
            body: fs.createReadStream(filePath),
         },
      });

      console.log(response.data);
   } catch (error) {
      console.log(error.message);
   }
}

// uploadFile();

async function deleteFile() {
   try {
      const response = await drive.files.delete({
         fileId: '1cKJHyN9EA40yrvNVgW18Sa84CGLQfGcV',
      });

      console.log(response.data, response.status);
   } catch (error) {
      console.log(error.message);
   }
}

// deleteFile();

async function generatePublicUrl() {
   try {
      const fileId = '1j9qNxdXtmPWgeTtpFPXK3pCNypk30oXm';
      await drive.permissions.create({
         fileId,
         requestBody: {
            role: 'reader',
            type: 'anyone',
         },
      });

      const result = await drive.files.get({
         fileId,
         fields: 'webViewLink, webContentLink',
      });
      console.log(result.data);
   } catch (error) {
      console.log(error.message);
   }
}

generatePublicUrl();