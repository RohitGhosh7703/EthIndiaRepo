import axios from 'axios';
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

