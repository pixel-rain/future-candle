import TheilSenRegression from "ml-regression-theil-sen";
import MAX_CANDLES_NUMBER from "./MAX_CANDLES_NUMBER";
import PREDICTED_CANDLES_NUMBER from "./PREDICTED_CANDLES_NUMBER";

function getPrediction(inputs: number[], outputs: number[], target: number) {
  const regression = new TheilSenRegression(inputs, outputs);
  const prediction = regression.predict(target);
  const digitsToRound = target.toString().split(".")[1];
  return Number(prediction.toFixed(digitsToRound ? digitsToRound.length : 0));
}

function formatQuery(ticker: string) {
  const pastDate = new Date(new Date().getTime() - 2592000000);
  const dateString = new Intl.DateTimeFormat("fr-ca").format(pastDate);
  return `http://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/${ticker}/candles.json?from=${dateString}&interval=24`;
}

function formatDate(str: string) {
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

export default async function getDataset(ticker: string) {
  const query = formatQuery(ticker);
  const res = await fetch(query);
  const { candles } = await res.json();

  const dataset = [0, 1, 2, 3].map((index) => {
    const raw = candles.data
      .map((val: number[]) => val[index])
      .slice(candles.data.length - MAX_CANDLES_NUMBER);
    const predictions = [0, 1, 2, 3].map((i) =>
      getPrediction(
        raw.slice(i, i + (MAX_CANDLES_NUMBER - (PREDICTED_CANDLES_NUMBER + 1))),
        raw.slice(i + 1, i + (MAX_CANDLES_NUMBER - PREDICTED_CANDLES_NUMBER)),
        raw[i + (MAX_CANDLES_NUMBER - PREDICTED_CANDLES_NUMBER)]
      )
    );
    return { predictions, raw };
  });

  const candlesticks = {};
  ["open", "close", "high", "low"].forEach(
    (marker, i) => (candlesticks[marker] = dataset[i])
  );

  candlesticks["rawDates"] = candles.data
    .map((val: string[]) => val[6])
    .slice(candles.data.length - MAX_CANDLES_NUMBER)
    .map((str: string) => formatDate(str));
  candlesticks["predictionDates"] = candlesticks["rawDates"].slice(-3);
  candlesticks["predictionDates"].push("Next Session");

  candlesticks["datasetMax"] = Math.max(...candlesticks["high"].raw);
  candlesticks["datasetMin"] = Math.min(...candlesticks["low"].raw);

  return candlesticks;
}
