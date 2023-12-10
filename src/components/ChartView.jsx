import React, { useState } from 'react';
import TransactionChart from './TransactionChart';
import axios from 'axios';

const ChartView = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Fetching transactions for address:', address);

    try {
      const ownerAddress = address; // Get the entered Ethereum address
      const url = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';
      const query = `
        {
          domains(where: {name: "${ownerAddress}"}) {
            id
            name
            labelName
            labelhash
            resolvedAddress {
              id
            }
          }
          transfers(where: {owner: "${ownerAddress}"}) {
            id
            domain {
              id
            }
            blockNumber
            transactionID
          }
        }
      `;

      // Perform the GraphQL query to get ETH address
      const response = await axios.post(url, { query }, { headers: { 'Content-Type': 'ChartViewlication/json' } });
      const ownerEthAddress = response.data.data.domains[0].resolvedAddress.id;
      console.log('Owner Fetched Successfully');
      console.log('Owner ENS name:', response.data.data.domains[0].name);
      console.log('Owner ETH address:', ownerEthAddress);

      // Fetch transactions based on the resolved ETH address using Etherscan API
      const apiKey = 'B7IP48V7AH6CASNT8GWAM26A4A4PYQ7VD6';
      const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${ownerEthAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
      const ethTransactions = await axios.get(apiUrl);
      console.log('Transactions Fetched Successfully');

      // Update state with fetched transactions
      setTransactions(ethTransactions.data.result || []);
      setShowTable(true);
      console.log('Total Transactions:', ethTransactions.data.result.length);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div style={{color:'wheat'}}>
      <h1>Transaction Gas Used Chart</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Ethereum Address: &nbsp;
          <input type="text" value={address} onChange={handleAddressChange}  className='text-black p-3' />
        </label>
        <br/>
        <button type="submit" className='bg-black p-3'>Fetch Transactions</button>
      </form>
      {showTable && (
        <div>
          <h2>All Transactions</h2>
          <table border="1" style={{color:'white', height:'80vh' , overflowY : 'scroll'}}>
            <thead>
              <tr>
                <th>Transaction Hash</th>
                <th>Block Number</th>
                <th>Gas Used</th>
                {/* Add other headers as needed */}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index}>
                  <td>{tx.hash}</td>
                  <td>{tx.blockNumber}</td>
                  <td>{tx.gasUsed}</td>
                  {/* Add other columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <TransactionChart transactions={transactions} />
    </div>
  );
};

export default ChartView;
