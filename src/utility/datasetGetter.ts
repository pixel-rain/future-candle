import TheilSenRegression from 'ml-regression-theil-sen';

function getPrediction(inputs, outputs, target) {
  const regression = new TheilSenRegression(inputs, outputs);
  return regression.predict(target);
}

function formatQuery(ticker) {
  const pastDate = new Date(new Date().getTime() - 2592000000);
  const dateString = new Intl.DateTimeFormat('fr-ca').format(pastDate)
  return `http://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/${ticker}/candles.json?from=${dateString}&interval=24`
}

export default async function getDataset(ticker) {
  const query = formatQuery(ticker);
  const res = await fetch(query);
  const { candles } = await res.json();
  const dataset = [0, 1, 2, 3].map(index => {
    const raw = candles.data.map(val => val[index]).slice(candles.data.length - 15);
    const predictions = [0, 1, 2, 3].map(i =>
      getPrediction(raw.slice(i, i + 10), raw.slice(i + 1, i + 11), raw[i + 11])
    );
    return { predictions, raw }
  });
  const candlesticks = {};
  ["open", "close", "high", "low"].forEach((marker, i) =>
    candlesticks[marker] = dataset[i]
  );
  candlesticks['datasetMax'] = Math.max(...candlesticks['high'].raw);
  candlesticks['datasetMin'] = Math.min(...candlesticks['low'].raw);
  candlesticks['rawLength'] = candlesticks['open'].raw.length;
  candlesticks['predictionsLength'] = candlesticks['open'].predictions.length;

  return candlesticks
}
