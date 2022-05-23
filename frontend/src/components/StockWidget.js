import React, { Component } from 'react';

export default class StockWidget extends Component {


  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "light",
      "dateRange": "1m",
      "exchange": "US",
      "showChart": true,
      "locale": "en",
      "width": "100%",
      "height": "100%",
      "largeChartUrl": "",
      "isTransparent": false,
      "plotLineColorGrowing": "rgba(33, 150, 243, 1)",
      "plotLineColorFalling": "rgba(33, 150, 243, 1)",
      "gridLineColor": "rgba(240, 243, 250, 1)",
      "scaleFontColor": "rgba(120, 123, 134, 1)",
      "belowLineFillColorGrowing": "rgba(33, 150, 243, 0.12)",
      "belowLineFillColorFalling": "rgba(33, 150, 243, 0.12)",
      "symbolActiveColor": "rgba(33, 150, 243, 0.12)"
    });
    document.getElementById("stockWidget").appendChild(script);
  }

  render() {
    return(
      <div id="stockWidget" className="stock-widget-container">
        <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget">
          </div>
        </div>
      </div>
    );
  }
}
