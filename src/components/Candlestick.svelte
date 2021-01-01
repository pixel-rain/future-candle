<script lang="ts">
  import type CandlestickData from "../interfaces/CandlestickData";
  
  export let item: CandlestickData;
  export let datasetMax: number;
  export let datasetMin: number;
  
  const { open, high, low, close } = item;
  const chartSize = 10;

  $: percent = (datasetMax - datasetMin) / 100;
  $: headTailSize = ((high - (close > open ? close : open)) / percent) / chartSize;
  $: bodySize = (Math.abs(open - close) / percent) / chartSize;
  $: bottomTailSize = (((close > open ? open : close) - low) / percent) / chartSize;
  $: upperOffset = ((datasetMax - high) / percent) / chartSize;
</script>

<div class="candle">
  <div
    class="tail" 
    style={`height: ${headTailSize}rem; margin-top: ${upperOffset}rem;`}></div>

  <div 
    class="body"
    class:down-candle={close < open}
    style={`height: ${bodySize}rem;`}></div>

  <div 
    class="tail" 
    style={`height: ${bottomTailSize}rem;`}></div>
</div>

<style>
  .candle {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tail {
    width: 2px;
    background-color: black;
  }

  .body {
    width: 3rem;
    border: 2px solid black;
  }

  .down-candle {
    background-color: black;
  }
</style>
