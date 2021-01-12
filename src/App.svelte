<script lang="ts">
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  import Candlestick from "./components/Candlestick.svelte";
  import StocksSelect from "./components/StocksSelect.svelte";
  import Spinner from "./components/Spinner.svelte";
  import Tooltip from "./components/Tooltip.svelte";
  import type hoveredCandle from "./interfaces/HoveredCandle";
  import { candlesticksData } from "./store";
  import { isSpinner } from "./store";
  import MAX_CANDLES_NUMBER from "./utility/MAX_CANDLES_NUMBER";
  import PREDICTED_CANDLES_NUMBER from "./utility/PREDICTED_CANDLES_NUMBER";

  let screenSize = { clientWidth: 0 };
  let candlesNotShown = 0;
  let isCrosshairShown = false;
  let isTooltipShown = false;
  let hoveredCandle: hoveredCandle;
  let actualForPredicted: hoveredCandle;

  const mouse = { top: 0, left: 0 };

  onMount(() => {
    setScreenSize();
    window.addEventListener("orientationchange", hideCrosshairAndTooltip);
  });

  onDestroy(() => {
    window.removeEventListener("orientationchange", hideCrosshairAndTooltip);
  });

  $: if (screenSize.clientWidth < 490) {
    candlesNotShown = MAX_CANDLES_NUMBER - 7;
  } else if (screenSize.clientWidth < 640) {
    candlesNotShown = MAX_CANDLES_NUMBER - 11;
  } else {
    candlesNotShown = 0;
  }

  $: rawListing = Array.from(
    Array(MAX_CANDLES_NUMBER - candlesNotShown).keys()
  ).map((val) => val + candlesNotShown);

  $: predictionsListing = Array.from(
    Array(PREDICTED_CANDLES_NUMBER).keys()
  );

  $: if (
    hoveredCandle &&
    hoveredCandle.isPredicted &&
    hoveredCandle.index < 3
  ) {
    const index = hoveredCandle.index + 12;
    actualForPredicted = {
      open: $candlesticksData.open.raw[index],
      high: $candlesticksData.high.raw[index],
      low: $candlesticksData.low.raw[index],
      close: $candlesticksData.close.raw[index],
      date: $candlesticksData.rawDates[index],
      isPredicted: false,
      index,
    };
  } else {
    actualForPredicted = null;
  }

  function handleMousemove(event: { pageX: number; pageY: number }) {
    if (!isCrosshairShown) {
      isCrosshairShown = true;
    }

    mouse.left = event.pageX;
    mouse.top = event.pageY;
  }

  function handleMouseover(event: { detail: hoveredCandle }) {
    hoveredCandle = event.detail;
  }

  function setScreenSize() {
    screenSize = {
      clientWidth: document.body.clientWidth,
    };
  }

  function hideCrosshairAndTooltip() {
    mouse.top = -1;
    mouse.left = -1;
  }
</script>

<style>
  main {
    font-family: "Roboto";
    height: 100%;
  }

  .main-header {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background-color: #121212;
    position: relative;
    z-index: 2;
    padding-bottom: 0.5rem;
  }

  .main-title {
    text-align: center;
    justify-self: center;
    border-bottom: 2px solid #65dc98;
    padding: 0 1rem 1rem;
  }

  .select-box {
    position: absolute;
    margin-right: 50rem;
  }

  @media all and (max-width: 1060px) {
    .main-title {
      padding-bottom: 4rem;
    }

    .select-box {
      margin-right: 14rem;
    }
  }

  @media all and (max-width: 490px) {
    .select-box {
      margin-right: 0;
    }
  }

  .crosshair-box {
    height: 100%;
  }

  .hair {
    position: absolute;
    pointer-events: none;
    z-index: 1;
  }

  .x-hair {
    height: 1px;
    width: 100%;
  }

  .x-hair-shown {
    border-top: 1px solid #65dc98;
  }

  .y-hair {
    height: 100%;
    width: 1px;
  }

  .y-hair-shown {
    border-left: 1px solid #65dc98;
  }

  .tooltip {
    position: absolute;
    z-index: 1;
    padding-right: 10px;
    padding-bottom: 10px;
    background-color: #121212;
    text-align: center;
    opacity: 0;
    width: max-content;
  }

  .show-tooltip {
    opacity: 1;
  }

  .tooltip-inner {
    padding: 1rem;
    border: 1px solid #65dc98;
  }

  .candle-box {
    width: min-content;
    margin: 2.5rem auto 0;
    position: relative;
  }

  .candle-box::before {
    content: "Actual";
    text-align: left;
  }

  .candle-box::after {
    content: "Predicted";
    text-align: right;
    position: absolute;
    right: 0;
  }

  .candle-row {
    display: flex;
  }

  .raw-row {
    padding-right: 2.4rem;
    padding-top: 1.5rem;
  }

  .predicted-row {
    justify-content: flex-end;
    padding-bottom: 1.5rem;
  }

  .spinner-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15rem;
  }
</style>

<svelte:window on:resize={setScreenSize} />

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
    <div class="tooltip-inner">
      <Tooltip {hoveredCandle} {actualForPredicted} />
    </div>
  </div>

  <div class="main-header">
    <div class="select-box">
      <StocksSelect />
    </div>

    <div class="main-title">
      <h1>The Future Candle</h1>

      A simple stock market prediction with the Theil–Sen estimator
    </div>
  </div>

  {#if !$isSpinner}
    <div
      on:mouseenter={() => (isCrosshairShown = true)}
      on:mouseleave={() => (isCrosshairShown = false)}
      on:mousemove={handleMousemove}
      class="crosshair-box">
      <div class="candle-box">
        <div class="candle-row raw-row">
          {#each rawListing as i}
            <Candlestick
              item={{ open: $candlesticksData.open.raw[i], close: $candlesticksData.close.raw[i], high: $candlesticksData.high.raw[i], low: $candlesticksData.low.raw[i], datasetMax: $candlesticksData.datasetMax, datasetMin: $candlesticksData.datasetMin, date: $candlesticksData.rawDates[i] }}
              index={i}
              on:mouseenter={() => (isTooltipShown = true)}
              on:mouseleave={() => (isTooltipShown = false)}
              on:candle-data={handleMouseover} />
          {/each}
        </div>

        <div class="candle-row predicted-row">
          {#each predictionsListing as i}
            <Candlestick
              item={{ open: $candlesticksData.open.predictions[i], close: $candlesticksData.close.predictions[i], high: $candlesticksData.high.predictions[i], low: $candlesticksData.low.predictions[i], datasetMax: $candlesticksData.datasetMax, datasetMin: $candlesticksData.datasetMin, date: $candlesticksData.predictionDates[i] }}
              index={i}
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
