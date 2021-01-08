<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type CandlestickData from "../interfaces/CandlestickData";

  export let item: CandlestickData;
  export let isPredicted: boolean = false;
  export let index: number;

  const dispatch = createEventDispatcher();
  const chartSize = 10;

  $: open = item.open;
  $: high = item.high;
  $: low = item.low;
  $: close = item.close;
  $: datasetMax = item.datasetMax;
  $: datasetMin = item.datasetMin;
  $: date = item.date;

  $: percent = (datasetMax - datasetMin) / 100;
  $: headTailSize =
    (high - (close > open ? close : open)) / percent / chartSize;
  $: bodySize = Math.abs(open - close) / percent / chartSize;
  $: bottomTailSize =
    ((close > open ? open : close) - low) / percent / chartSize;
  $: upperOffset = (datasetMax - high) / percent / chartSize;
</script>

<style>
  .candle {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }

  .tail {
    width: 2px;
    background-color: black;
  }

  .body {
    width: 1.5rem;
    border: 2px solid black;
  }

  .body-predicted {
    border: 2px solid silver;
  }

  .body-down {
    background-color: black;
  }

  .predicted {
    background-color: silver;
  }
</style>

<div
  on:mouseover={() => dispatch('candle-data', {
      open,
      high,
      low,
      close,
      date,
      isPredicted,
      index,
    })}
  on:mouseenter
  on:mouseleave
  class="candle">
  <div
    class="tail"
    class:predicted={isPredicted}
    style={`height: ${headTailSize}rem; margin-top: ${upperOffset}rem;`} />

  <div
    class="body"
    class:body-down={close < open && !isPredicted}
    class:predicted={close < open && isPredicted}
    class:body-predicted={isPredicted}
    style={`height: ${bodySize}rem;`} />

  <div
    class="tail"
    class:predicted={isPredicted}
    style={`height: ${bottomTailSize}rem;`} />
</div>
