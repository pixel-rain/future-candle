<script lang="ts">
  import Candlestick from "./components/Candlestick.svelte";
  import type CandlestickData from "./interfaces/CandlestickData";

  const item: CandlestickData = {
    open: 100,
    high: 250,
    low: 80,
    close: 220,
  };

</script>

<main>
  <Candlestick
    item={item}
    datasetMax={300}
    datasetMin={30}
  />
</main>

<style>

</style>