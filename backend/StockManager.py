import requests
from datetime import datetime, timedelta

stocks = {
    'Ethical Investing': ["AAPL", "TSLA", "ADBE"],
    'Growth Investing': ["OXLC", "ECC", "AMD"],
    'Index Investing': ["VOO", "VTI", "ILTB"],
    'Quality Investing': ["NVDA", "MU", "CSCO"],
    'Value Investing': ["INTC", "BABA", "GE"]
}


def get_latest_price(strategies):

    latest_price = {}
    base_url = 'https://financialmodelingprep.com/api/v3/stock/real-time-price/'
    url_filter = ''
    for strategy in strategies:
        url_filter = url_filter + ',' + ','.join(stocks[strategy])

    response = requests.get(base_url + url_filter + "?apikey=77af382c4ad2e8317d49e53ee241ff6e" )
    if response.status_code != 200:
        Exception("API Error")
    response_json = response.json()
    for item in response_json['companiesPriceList']:
        latest_price[item['symbol']] = {"price": item['price'], "strategy": get_strategy_by_stock(item['symbol'])}

    return latest_price


def allocate_stocks(amount, strategies):

    allocation = {}
    pie_chart_data = []

    # get the latest price
    latest_price = get_latest_price(strategies)

    # sort by desc price
    latest_price = {k: v for k, v in sorted(latest_price.items(), key=lambda item: item[1]["price"], reverse=True)}

    change = 0
    per_stock_amount = 0
    if len(latest_price) != 0:
        per_stock_amount = amount / len(latest_price)

    for ticker, meta in latest_price.items():
        stock_price = float(meta.get("price"))
        number_of_stocks = int((per_stock_amount + change)/stock_price)
        change = (per_stock_amount + change) - (stock_price * number_of_stocks)
        allocation[ticker] = {"stocks": number_of_stocks, "price": stock_price, "strategy": meta.get("strategy")}
        pie_chart_data.append({"name": ticker, "value": number_of_stocks * stock_price})

    return {"allocation": allocation, "weekly_trend": get_weekly_trend(strategies, allocation),
            "pie_chart_data": pie_chart_data}


def get_weekly_trend(strategies, allocation):
    # "https://financialmodelingprep.com/api/v3/historical-price-full/AAPL,MSFT?from=2019-12-10&to=2019-12-12"

    weekly_trend = {"total": {}}
    weekly_trend = []

    base_url = 'https://financialmodelingprep.com/api/v3/historical-price-full/'
    from_date = (datetime.today() - timedelta(days=8)).strftime('%Y-%m-%d')
    to_date = (datetime.today() - timedelta(days=1)).strftime('%Y-%m-%d')
    date_filter = '?from={}&to={}'.format(from_date, to_date)

    for strategy in strategies:
        for ticker in stocks.get(strategy):
            response = requests.get(base_url + ticker + date_filter + "&apikey=77af382c4ad2e8317d49e53ee241ff6e")
            if response.status_code != 200:
                Exception("API Error")
            response_json = response.json()
            ticker = response_json['symbol']
            # weekly_trend[ticker] = {}

            for trend in response_json['historical']:
                date = trend['date']
                trend_index = next((weekly_trend.index(x) for x in weekly_trend if x['name'] == date), None)
                if trend_index is None:
                    element = {'name': date}
                    weekly_trend.append(element)
                    trend_index = weekly_trend.index(element)

                stock_allocation = trend['close'] * allocation.get(ticker).get("stocks")

                # weekly_trend[ticker][date] = stock_allocation
                weekly_trend[trend_index][ticker] = stock_allocation
                if weekly_trend[trend_index].get("Total Portfolio") is None:
                    weekly_trend[trend_index]["Total Portfolio"] = stock_allocation
                else:
                    weekly_trend[trend_index]["Total Portfolio"] += stock_allocation

                # if weekly_trend["total"].get(date) is None:
                #     weekly_trend["total"][date] = stock_allocation
                # else:
                #     weekly_trend["total"][date] += stock_allocation

    # add today's portfolio value to weekly trend
    element = {'name': 'Latest Value'}
    weekly_trend.append(element)
    trend_index = weekly_trend.index(element)
    portfolio_value = 0
    for ticker, meta in allocation.items():
        weekly_trend[trend_index][ticker] = meta.get("stocks") * meta.get("price")
        # weekly_trend.get(ticker)["latest"] = meta.get("stocks") * meta.get("price")
        portfolio_value += meta.get("stocks") * meta.get("price")
    # date_today = (datetime.today()).strftime('%Y-%m-%d')
    # weekly_trend["total"]["latest"] = portfolio_value
    weekly_trend[trend_index]["Total Portfolio"] = portfolio_value

    return weekly_trend


def get_strategy_by_stock(ticker):
    for strategy, tickers in stocks.items():
        if ticker in tickers:
            return strategy
