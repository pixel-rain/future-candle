<script lang="ts">
  import Candlestick from "./components/Candlestick.svelte";
  import type CandlestickData from "./interfaces/CandlestickData";

  const candlesticks = {
    open: {
      predictions: [
        270.9279654359781,
        270.6364511352418,
        272.7111468970935,
        272.46511665325824
      ],
      raw: [
        276.55,  282.5, 285.01,
        278.53,    278, 279.81,
        277.22,  266.2, 259.55,
        262.25, 271.98, 269.97,
        270.9, 275.91, 272.49
      ]
    },
    close: {
      predictions: [
        269.7930685920577,
        274.11590562109643,
        272.07348837209304,
        270.3686046511628
      ],
      raw: [
        282.2, 283.73, 279.95,
        278.7, 278.35,  278.5,
        270.16, 261.79, 262.04,
        270.1, 269.32, 270.64,
        274.7,    272, 271.65
      ]
    },
    high: {
      predictions: [
        270.61949019607846,
        274.55246231155775,
        276.05142335766425,
        274.6933659730722
      ],
      raw: [
        282.2,  284.6, 287.74,
        283.76, 280.84, 285.16,
        277.4, 267.34, 267.42,
        270.29, 272.82,    271,
        275.19, 276.43, 274.24
      ]
    },
    low: {
      predictions: [
        269.2671615201901,
        269.63655961284655,
        271.4533416458853,
        270.98592823712966
      ],
      raw: [
        275.2, 279.78,  277.1,
        276.07, 276.14, 276.54,
        268.52,  259.7, 257.05,
        260.22, 267.13, 268.28,
        269.73, 271.26, 270.12
      ]
    },
    datasetMax: 287.74,
    datasetMin: 257.05,
    rawLength: 15,
    predictionsLength: 4
  };
  const rawListing = Array.from(Array(candlesticks.rawLength).keys());
  const predictionsListing = Array.from(Array(candlesticks.predictionsLength).keys());

</script>

<main>
  <div class="candle-box">
    <div class="candle-row raw-row">
      {#each rawListing as i}
        <Candlestick
          item={{
            open: candlesticks.open.raw[i],
            close: candlesticks.close.raw[i],
            high: candlesticks.high.raw[i],
            low: candlesticks.low.raw[i],
            datasetMax: candlesticks.datasetMax,
            datasetMin: candlesticks.datasetMin
          }}
        />
      {/each}
    </div>
  
    <div class="candle-row predicted-row">
      {#each predictionsListing as i}
        <Candlestick
          item={{
            open: candlesticks.open.predictions[i],
            close: candlesticks.close.predictions[i],
            high: candlesticks.high.predictions[i],
            low: candlesticks.low.predictions[i],
            datasetMax: candlesticks.datasetMax,
            datasetMin: candlesticks.datasetMin
          }}
          isPredicted
        />
      {/each}
    </div>
  </div>
</main>

<style>
  .candle-box {
    width: min-content;
    margin: 1rem auto;
  }

  .candle-row {
    display: flex;
  }

  .raw-row {
    padding-right: 2.4rem;
  }

  .predicted-row {
    justify-content: flex-end;
  }
</style>