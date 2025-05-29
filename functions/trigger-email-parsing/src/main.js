import axios from 'axios';
import { Client, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const document = req.body;
  log('Making portmark request for document: ' + document.$id);
  log('Email: ' + document.email);
  log('Subject: ' + document.subject);
  log('Body: ' + document.body);
  log('Postmark from email: ' + process.env.POSTMARK_FROM_EMAIL);
  log('Postmark to email: ' + process.env.POSTMARK_TO_EMAIL);

  try {
    const response = await axios.post(
      'https://api.postmarkapp.com/email',
      {
        From: process.env.POSTMARK_FROM_EMAIL,
        To: process.env.POSTMARK_TO_EMAIL,
        Subject: document.subject,
        TextBody: document.body,
        HtmlBody: JSON.stringify(document),
      },
      {
        headers: {
          'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );
    log('\n\nPostmark response:', response.data);
  } catch (err) {
    error('Error making portmark request: ' + err.message);
    if (err.response) {
      error('Error details: ' + JSON.stringify(err.response.data));
    }
  }

  const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68347e9a001a5950451b')
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);

  const response = await databases.updateDocument(
    'main',
    'tickets',
    document.$id,
    {
      processing_status: 'processing',
    }
  );

  log('\n\nUpdated document: ' + JSON.stringify(response, null, 2));

  return res.json({
    success: true,
  });
};
