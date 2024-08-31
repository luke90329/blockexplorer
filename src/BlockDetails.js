import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function BlockDetails({ match }) {
  const [block, setBlock] = useState(null);
  const blockNumber = match.params.number;
  const history = useHistory();

  useEffect(() => {
    async function getBlock() {
      const blockData = await alchemy.core.getBlockWithTransactions(parseInt(blockNumber));
      setBlock(blockData);
    }

    getBlock();
  }, [blockNumber]);

  if (!block) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Block Number: {block.number}</h1>
      <h2>Transactions:</h2>
      <div>
        {block.transactions.map((tx) => (
          <div key={tx.hash} style={{ marginBottom: '10px' }}>
            <button 
              onClick={() => history.push(`/transaction/${tx.hash}`)} 
              style={{
                margin: '5px',
                padding: '5px 10px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {tx.hash}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlockDetails;