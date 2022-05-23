import React, { Component } from 'react';

export default class Widget extends Component {


  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "description": "", "proName": "AAPL"},
        { "description": "", "proName": "TSLA"},
        { "description": "", "proName": "ADBE"},
        { "description": "", "proName": "OXLC"},
        { "description": "", "proName": "ECC"},
        { "description": "", "proName": "AMD"},
        { "description": "", "proName": "VOO"},
        { "description": "", "proName": "VTI"},
        { "description": "", "proName": "ILTB"},
        { "description": "", "proName": "NVDA"},
        { "description": "", "proName": "MU"},
        { "description": "", "proName": "CSCO"},
        { "description": "", "proName": "INTC"},
        { "description": "", "proName": "BABA"},
        { "description": "", "proName": "GE"}
        ],
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "en"
    })
    document.getElementById("myContainer").appendChild(script);
  }

  render() {
    return(
      <div id="myContainer">
        <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget">
          </div>
        </div>
      </div>
    );
  }
}
