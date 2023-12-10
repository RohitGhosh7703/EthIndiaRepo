// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const referer = req.headers.referer || req.headers.referrer; // get the referer from the request headers

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method should be POST' });
    }

    if (process.env.NODE_ENV !== 'development') {
      if (!referer || referer !== process.env.APP_URL) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }

    const { body } = req;
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer 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`,
    };

    const response = await axios.post(url, body, { headers: headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('API Error:', error.message, error.response?.data);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({ message: 'No response received from the server' });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ message: 'Request setup error' });
    }
  }
}
