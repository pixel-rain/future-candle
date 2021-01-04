<script lang="ts">
  import Candlestick from "./components/Candlestick.svelte";
  import StocksSelect from "./components/StocksSelect.svelte";
  import { candlesticksData } from "./store";

  $: rawListing = $candlesticksData ? Array.from(Array($candlesticksData.rawLength).keys()) : [];
  $: predictionsListing = $candlesticksData ? Array.from(Array($candlesticksData.predictionsLength).keys()) : [];

</script>

<main>
  <StocksSelect />
  
  {#if $candlesticksData}
    <div class="candle-box">
      <div class="candle-row raw-row">
        {#each rawListing as i}
          <Candlestick
            item={{
              open: $candlesticksData.open.raw[i],
              close: $candlesticksData.close.raw[i],
              high: $candlesticksData.high.raw[i],
              low: $candlesticksData.low.raw[i],
              datasetMax: $candlesticksData.datasetMax,
              datasetMin: $candlesticksData.datasetMin
            }}
          />
        {/each}
      </div>
    
      <div class="candle-row predicted-row">
        {#each predictionsListing as i}
          <Candlestick
            item={{
              open: $candlesticksData.open.predictions[i],
              close: $candlesticksData.close.predictions[i],
              high: $candlesticksData.high.predictions[i],
              low: $candlesticksData.low.predictions[i],
              datasetMax: $candlesticksData.datasetMax,
              datasetMin: $candlesticksData.datasetMin
            }}
            isPredicted
          />
        {/each}
      </div>
    </div>
  {/if}
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