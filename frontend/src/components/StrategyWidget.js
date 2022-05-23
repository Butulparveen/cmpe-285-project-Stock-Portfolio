import React, { Component } from 'react';

export default class StrategyWidget extends Component {


  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "light",
      "dateRange": "12m",
      "showChart": true,
      "locale": "en",
      "width": "100%",
      "height": "100%",
      "largeChartUrl": "",
      "isTransparent": false,
      "plotLineColorGrowing": "rgba(33, 150, 243, 1)",
      "plotLineColorFalling": "rgba(33, 150, 243, 1)",
      "gridLineColor": "rgba(233, 233, 234, 1)",
      "scaleFontColor": "rgba(120, 123, 134, 1)",
      "belowLineFillColorGrowing": "rgba(33, 150, 243, 0.12)",
      "belowLineFillColorFalling": "rgba(33, 150, 243, 0.12)",
      "symbolActiveColor": "rgba(33, 150, 243, 0.12)",
      "tabs": [
        {
          "title": "Ethical",
          "symbols": [
            {
              "s": "NASDAQ:AAPL"
            },
            {
              "s": "NASDAQ:TSLA"
            },
            {
              "s": "NASDAQ:ADBE"
            }
          ],
          "originalTitle": "Indices"
        },
        {
          "title": "Growth",
          "symbols": [
            {
              "s": "NASDAQ:OXLC"
            },
            {
              "s": "NYSE:ECC"
            },
            {
              "s": "NASDAQ:AMD"
            }
          ],
          "originalTitle": "Commodities"
        },
        {
          "title": "Index",
          "symbols": [
            {
              "s": "AMEX:VOO"
            },
            {
              "s": "AMEX:VTI"
            },
            {
              "s": "AMEX:ILTB"
            }
          ],
          "originalTitle": "Bonds"
        },
        {
          "title": "Quality",
          "symbols": [
            {
              "s": "NASDAQ:NVDA"
            },
            {
              "s": "NASDAQ:MU"
            },
            {
              "s": "NASDAQ:CSCO"
            }
          ],
          "originalTitle": "Forex"
        },
        {
          "title": "Value",
          "symbols": [
            {
              "s": "NASDAQ:INTC"
            },
            {
              "s": "NYSE:BABA"
            },
            {
              "s": "NYSE:GE"
            }
          ]
        }
      ]
    });
    document.getElementById("strategyWidget").appendChild(script);
  }

  render() {
    return(
      <div id="strategyWidget" className="stock-widget-container">
        <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget">
          </div>
        </div>
      </div>
    );
  }
}
