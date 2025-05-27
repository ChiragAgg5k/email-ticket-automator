import axios from 'axios';

export default async ({ req, res, log, error }) => {
  const document = req.body;
  log('Making portmark request for document: ' + document.$id);

  try {
    await axios.post(
      'https://api.postmarkapp.com/email',
      {
        From: document.email,
        To: process.env.POSTMARK_FROM_EMAIL,
        Subject: document.subject,
        TextBody: document.body,
        HtmlBody: `<html><body><strong>${document.subject}</strong><br/>${document.body}</body></html>`,
        MessageStream: 'inbound',
      },
      {
        headers: {
          'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_TOKEN,
        },
      }
    );
  } catch (err) {
    error('Error making portmark request: ' + err.message);
  }

  return res.json({
    success: true,
  });
};
