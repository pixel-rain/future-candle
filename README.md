An app for simple stock market predictions with the Theil–Sen estimator written in Svelte and Typescript. It uses the free API of Moscow Stock Exchange to fetch the latest historical prices of some of the most popular stocks that are traded there.

The actual prices and price predictions are visualized with candlestick daily charts. They show the actual historical data and four predicted candles, three are for the past three trading sessions, so you could compare the actual and the predicted data, and one "future candle" is for the next session.

The app was created with sveltejs/template and follows its usual commands - "npm run dev" to start it in the dev mode, "npm run build" to make a production build, "npm run start" to launch the newly built app.

It's currently published on-line on http://future-candle.surge.sh

The desktop appearance:

![The desktop appearance](/screenshots/desktop.png)

The tablet appearance:

![The tablet appearance](/screenshots/tablet.png)

The mobile appearance:

![The mobile appearance](/screenshots/mobile.png)
