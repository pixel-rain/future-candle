<script lang="ts">
  import type HoveredCandle from "../interfaces/HoveredCandle";

  export let hoveredCandle: HoveredCandle;
  export let actualForPredicted: HoveredCandle;

  $: open = hoveredCandle ? hoveredCandle.open : "";
  $: high = hoveredCandle ? hoveredCandle.high : "";
  $: low = hoveredCandle ? hoveredCandle.low : "";
  $: close = hoveredCandle ? hoveredCandle.close : "";
  $: date = hoveredCandle ? hoveredCandle.date : "";
  $: isPredicted = hoveredCandle ? hoveredCandle.isPredicted : false;

  $: actualOpen = actualForPredicted ? actualForPredicted.open : "";
  $: actualHigh = actualForPredicted ? actualForPredicted.high : "";
  $: actualLow = actualForPredicted ? actualForPredicted.low : "";
  $: actualClose = actualForPredicted ? actualForPredicted.close : "";
</script>

<style>
  .title {
    border-bottom: 1px solid black;
    padding-bottom: 0.2rem;
    margin-bottom: 0.4rem;
  }

  .price-box {
    text-align: left;
  }

  .predicted {
    display: flex;
    text-align: left;
  }

  .predicted-left {
    margin-right: 0.5rem;
  }

  .subtitle {
    display: inline-block;
    border-bottom: 1px solid black;
    margin-bottom: 0.2rem;
  }

  .subtitle-right {
    margin-left: 0.5rem;
  }

  .inner-right {
    padding-left: 0.5rem;
    border-left: 1px solid black;
  }
</style>

<div class="title">{date}</div>

{#if !isPredicted || date === 'Next Session'}
  <div class="price-box">
    open:
    {open}
    <br />
    high:
    {high}
    <br />
    low:
    {low}
    <br />
    close:
    {close}
  </div>
{:else}
  <div class="predicted">
    <div class="predicted-left">
      <span class="subtitle">Predicted</span>
      <div>
        open:
        {open}
        <br />
        high:
        {high}
        <br />
        low:
        {low}
        <br />
        close:
        {close}
      </div>
    </div>

    <div>
      <span class="subtitle subtitle-right">Actual</span>
      <div class="inner-right">
        open:
        {actualOpen}
        <br />
        high:
        {actualHigh}
        <br />
        low:
        {actualLow}
        <br />
        close:
        {actualClose}
      </div>
    </div>
  </div>
{/if}
