import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function BlockList() {
  const [blocks, setBlocks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getBlocks() {
      const latestBlock = await alchemy.core.getBlockNumber();
      const blockPromises = [];
      for (let i = 0; i < 10; i++) {
        blockPromises.push(alchemy.core.getBlockWithTransactions(latestBlock - i));
      }
      const blockObjs = await Promise.all(blockPromises);
      setBlocks(blockObjs);
    }

    getBlocks();
  }, []);

  return (
    <div className="App">
      {blocks.map((block) => (
        <button 
          key={block.number} 
          onClick={() => history.push(`/block/${block.number}`)} 
          style={{
            margin: '10px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Block Number: {block.number}
        </button>
      ))}
    </div>
  );
}

export default BlockList;