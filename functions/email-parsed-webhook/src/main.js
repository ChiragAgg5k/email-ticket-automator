import { Client, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const { method, path } = req;

  if (method != 'POST' || path !== '/parse-email') {
    error('Invalid request: ' + method + ' ' + path);
    return res.json({
      success: false,
      message: 'Invalid request',
    });
  }

  const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68347e9a001a5950451b')
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);
  const document = JSON.parse(req.bodyJson.HtmlBody);

  log('\n\nDocument: ' + document.$id);

  const response = await databases.updateDocument(
    'main',
    'tickets',
    document.$id,
    {
      processing_status: 'completed',
      rawJson: JSON.stringify(req.bodyJson),
    }
  );

  log('\n\nUpdated document: ' + JSON.stringify(response, null, 2));

  return res.json({
    success: true,
  });
};
