import React, { Component } from 'react';
import './pages/components/top-navigation';
import './pages/components/page-loader';
import '../dapp/pages/dapp';

class App extends Component {
  
  render() {
    return (
        <div className="flexible-content">
          <top-navigation collapse="true" />
          <page-loader id="page-loader" />
        </div>
    );
  }
}

export default App;
