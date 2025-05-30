import { Client, Databases } from 'node-appwrite';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TicketDescription = z.object({
  description: z.string(),
  priority: z.enum(['high', 'medium', 'low']),
});

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

  const openaiResponse = await openai.responses.parse({
    model: 'gpt-4o-2024-08-06',
    input: [
      {
        role: 'system',
        content: `Extract ticket information from support emails.

Description: Summarize the main issue clearly, include key details like error messages or steps taken. Remove pleasantries and focus on actionable information.

Priority:
- HIGH: System outages, security issues, data loss, payment failures
- MEDIUM: Feature requests, non-critical bugs, account issues  
- LOW: General questions, documentation requests, minor issues

Look for urgency indicators and business impact to determine priority.`,
      },
      {
        role: 'user',
        content: `Email: ${JSON.stringify(req.bodyJson)}`,
      },
    ],
    text: {
      format: zodTextFormat(TicketDescription, 'ticket'),
    },
  });
  const parsed = openaiResponse.output_parsed;
  log('\n\nParsed: ' + JSON.stringify(parsed, null, 2));

  const response = await databases.updateDocument(
    'main',
    'tickets',
    document.$id,
    {
      processing_status: 'completed',
      rawJson: JSON.stringify(req.bodyJson),
      description: parsed.description,
      priority: parsed.priority,
    }
  );

  log('\n\nUpdated document: ' + JSON.stringify(response, null, 2));

  return res.json({
    success: true,
  });
};
