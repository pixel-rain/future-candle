<script lang="ts">
  import Candlestick from "./components/Candlestick.svelte";
  import StocksSelect from "./components/StocksSelect.svelte";
  import Spinner from "./components/Spinner.svelte";
  import type hoveredCandle from "./interfaces/HoveredCandle";
  import { candlesticksData } from "./store";
  import { isSpinner } from "./store";

  let isCrosshairShown = false;
  let isTooltipShown = false;
  let hoveredCandle: hoveredCandle;
  const mouse = { top: 0, left: 0 };

  $: rawListing = $candlesticksData
    ? Array.from(Array($candlesticksData.rawLength).keys())
    : [];
  $: predictionsListing = $candlesticksData
    ? Array.from(Array($candlesticksData.predictionsLength).keys())
    : [];

  $: tooltipOpen = hoveredCandle ? hoveredCandle.open : "";
  $: tooltipHigh = hoveredCandle ? hoveredCandle.high : "";
  $: tooltipLow = hoveredCandle ? hoveredCandle.low : "";
  $: tooltipClose = hoveredCandle ? hoveredCandle.close : "";
  $: tooltipDate = hoveredCandle ? hoveredCandle.date : "";

  function handleMousemove(event) {
    mouse.left = event.clientX;
    mouse.top = event.clientY;
  }

  function handleMouseover(event) {
    hoveredCandle = event.detail;
  }
</script>

<style>
  .hair {
    position: absolute;
    pointer-events: none;
    z-index: 1;
  }

  .x-hair {
    width: 100%;
    height: 1px;
  }

  .x-hair-shown {
    border-top: 1px solid black;
  }

  .y-hair {
    height: 100%;
    width: 1px;
  }

  .y-hair-shown {
    border-left: 1px solid black;
  }

  .tooltip {
    position: absolute;
    z-index: 1;
    padding: 1rem;
    border: 1px solid black;
    text-align: center;
    opacity: 0;
  }

  .tooltip-title {
    border-bottom: 1px solid black;
  }

  .show-tooltip {
    opacity: 1;
  }

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

  .spinner-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15rem;
  }
</style>

<main>
  <div
    class="hair x-hair"
    class:x-hair-shown={isCrosshairShown}
    style={`top: ${mouse.top}px;`} />

  <div
    class="hair y-hair"
    class:y-hair-shown={isCrosshairShown}
    style={`left: ${mouse.left}px;`} />

  <div
    class="tooltip"
    class:show-tooltip={isTooltipShown}
    style={`top: ${mouse.top + 10}px; left: ${mouse.left + 10}px;`}>
    <div class="tooltip-title">{tooltipDate}</div>

    open:
    {tooltipOpen}
    <br />
    high:
    {tooltipHigh}
    <br />
    low:
    {tooltipLow}
    <br />
    close:
    {tooltipClose}
  </div>

  <StocksSelect />

  {#if !$isSpinner}
    <div
      on:mouseenter={() => (isCrosshairShown = true)}
      on:mouseleave={() => (isCrosshairShown = false)}
      on:mousemove={handleMousemove}>
      <div class="candle-box">
        <div class="candle-row raw-row">
          {#each rawListing as i}
            <Candlestick
              item={{ open: $candlesticksData.open.raw[i], close: $candlesticksData.close.raw[i], high: $candlesticksData.high.raw[i], low: $candlesticksData.low.raw[i], datasetMax: $candlesticksData.datasetMax, datasetMin: $candlesticksData.datasetMin, date: $candlesticksData.rawDates[i] }}
              on:mouseenter={() => (isTooltipShown = true)}
              on:mouseleave={() => (isTooltipShown = false)}
              on:candle-data={handleMouseover} />
          {/each}
        </div>

        <div class="candle-row predicted-row">
          {#each predictionsListing as i}
            <Candlestick
              item={{ open: $candlesticksData.open.predictions[i], close: $candlesticksData.close.predictions[i], high: $candlesticksData.high.predictions[i], low: $candlesticksData.low.predictions[i], datasetMax: $candlesticksData.datasetMax, datasetMin: $candlesticksData.datasetMin, date: $candlesticksData.predictionDates[i] }}
              isPredicted
              on:mouseenter={() => (isTooltipShown = true)}
              on:mouseleave={() => (isTooltipShown = false)}
              on:candle-data={handleMouseover} />
          {/each}
        </div>
      </div>
    </div>
  {:else}
    <div class="spinner-box">
      <Spinner />
    </div>
  {/if}
</main>
