import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlockList from './BlockList';
import BlockDetails from './BlockDetails';
import TransactionDetails from './TransactionDetails';
import AccountDetails from './AccountDetails';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={BlockList} />
        <Route path="/account/" component={AccountDetails} />
        <Route path="/block/:number" component={BlockDetails} />
        <Route path="/transaction/:hash" component={TransactionDetails} />
      </Switch>
    </Router>
  );
}

export default App;