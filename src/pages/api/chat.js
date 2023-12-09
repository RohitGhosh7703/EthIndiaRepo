// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default async function handler(req, res) {
  const referer = req.headers.referer || req.headers.referrer; // get the referer from the request headers

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method should be POST' });
  } else if (process.env.NODE_ENV !== "development") {
    if (!referer || referer !== process.env.APP_URL) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
  else {
    try {
      const { body } = req;
      const url = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer  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`
      };

      const response = await axios.post(url, body, { headers: headers })

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  
}



// Replace these with your actual values
const apiKey = 'B7IP48V7AH6CASNT8GWAM26A4A4PYQ7VD6';
const address = '0x59387E6869A12d76f321Ea609de4e073284F734F';

// Construct the API request URL
const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

// Make the API request
axios.get(apiUrl)
  .then(response => {
    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      // Parse the JSON response
      const data = response.data;

      // Access transaction details
      const transactions = data.result || [];
      transactions.forEach(tx => {
        console.log('Transaction Hash:', tx.hash);
        console.log('Block Number:', tx.blockNumber);
        console.log('From:', tx.from);
        console.log('To:', tx.to);
        console.log('Value:', tx.value);
        console.log('Gas Price:', tx.gasPrice);
        console.log('Gas Used:', tx.gasUsed);
        console.log('\n');
      });
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  })
  .catch(error => {
    console.error('Request failed:', error.message);
  });

