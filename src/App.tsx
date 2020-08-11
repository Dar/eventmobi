import React, {Component} from 'react';

import Layout from './containers/Layout/Layout';
import Search from './components/Search/Search'
class App extends Component {  
  
  
  render() {
    return (
      <Layout>
        <Search />
      </Layout>
    );
  }
  
}

export default App;
