import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function TransactionDetails({ match }) {
  const [transaction, setTransaction] = useState(null);
  const transactionHash = match.params.hash;

  useEffect(() => {
    async function getTransaction() {
      const transactionData = await alchemy.core.getTransactionReceipt(transactionHash);
      console.log(transactionData);
      setTransaction(transactionData);
    }

    getTransaction();
  }, [transactionHash]);

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Transaction Hash: {transaction.hash}</h1>
      <p><strong>From:</strong> {transaction.from}</p>
      <p><strong>To:</strong> {transaction.to}</p>

    </div>
  );
}

export default TransactionDetails;