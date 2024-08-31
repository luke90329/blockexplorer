import { Alchemy, Network, Utils } from 'alchemy-sdk'; // 修改這行
import { useEffect, useState } from 'react';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function AccountDetails() {
  const [account, setAccount] = useState(null);
  const [accountAddress, setAccountAddress] = useState('');
  const [fetchAccount, setFetchAccount] = useState(false);

  useEffect(() => {
    if (fetchAccount && accountAddress) { 
      async function getAccount() {
        try {
          const accountData = await alchemy.core.getBalance(accountAddress);
          const ethBalance = Utils.formatEther(accountData);
          setAccount(ethBalance);
        } catch (error) {
          console.error('Error fetching account data:', error);
          setAccount(null);
        } finally {
          setFetchAccount(false); 
        }
      }

      getAccount();
    }
  }, [fetchAccount, accountAddress]); 

  return (
    <div className="App">
      <h1>帳戶詳情</h1>
      <div>
        <input
          type="text"
          placeholder="輸入帳戶地址"
          value={accountAddress}
          onChange={(e) => setAccountAddress(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            marginRight: '10px'
          }}
        />
        <button
          onClick={() => {
            if (accountAddress) {
              setFetchAccount(true); 
            }
          }}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          確認
        </button>
      </div>
    <h2>當前帳戶餘額: {account} eth</h2>
    </div>
  );
}

export default AccountDetails;