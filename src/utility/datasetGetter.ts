import TheilSenRegression from "ml-regression-theil-sen";

function getPrediction(inputs, outputs, target) {
  const regression = new TheilSenRegression(inputs, outputs);
  const prediction = regression.predict(target);
  const digitsToRound = target.toString().split(".")[1];
  return Number(prediction.toFixed(digitsToRound ? digitsToRound.length : 0));
}

function formatQuery(ticker) {
  const pastDate = new Date(new Date().getTime() - 2592000000);
  const dateString = new Intl.DateTimeFormat("fr-ca").format(pastDate);
  return `http://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/${ticker}/candles.json?from=${dateString}&interval=24`;
}

function formatDate(str) {
  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };

  return `${str.substr(8, 2)} ${months[str.substr(5, 2)]} ${str.substr(0, 4)}`;
}

export default async function getDataset(ticker) {
  const query = formatQuery(ticker);
  const res = await fetch(query);
  const { candles } = await res.json();

  const dataset = [0, 1, 2, 3].map((index) => {
    const raw = candles.data
      .map((val) => val[index])
      .slice(candles.data.length - 15);
    const predictions = [0, 1, 2, 3].map((i) =>
      getPrediction(raw.slice(i, i + 10), raw.slice(i + 1, i + 11), raw[i + 11])
    );
    return { predictions, raw };
  });

  const candlesticks = {};
  ["open", "close", "high", "low"].forEach(
    (marker, i) => (candlesticks[marker] = dataset[i])
  );

  candlesticks["rawDates"] = candles.data
    .map((val) => val[6])
    .slice(candles.data.length - 15)
    .map((str) => formatDate(str));
  candlesticks["predictionDates"] = candlesticks["rawDates"].slice(-3);
  candlesticks["predictionDates"].push("Next Session");

  candlesticks["datasetMax"] = Math.max(...candlesticks["high"].raw);
  candlesticks["datasetMin"] = Math.min(...candlesticks["low"].raw);

  candlesticks["rawLength"] = candlesticks["open"].raw.length;
  candlesticks["predictionsLength"] = candlesticks["open"].predictions.length;

  return candlesticks;
}
