<script lang="ts">
  import { onMount } from 'svelte';
  import { candlesticksData } from "../store";
  import getDataset from "../utility/datasetGetter";

  const tickers = [
    {ticker: "ALRS", title: "Alrosa (ALRS)"},
    {ticker: "FEES", title: "FSK YeES (FEES)"},
    {ticker: "GAZP", title: "Gazprom (GAZP)"},
    {ticker: "IRAO", title: "Inter RAO YEES (IRAO)"},
    {ticker: "LKOH", title: "Lukoil (LKOH)"},
    {ticker: "MTSS", title: "MTS (MTSS)"},
    {ticker: "MGNT", title: "Magnit (MGNT)"},
    {ticker: "MOEX", title: "Moscow Exchange (MOEX)"},
    {ticker: "GMKN", title: "Nornickel (GMKN)"},
    {ticker: "NVTK", title: "Novatek (NVTK)"},
    {ticker: "NLMK", title: "Novolipetsk Steel (NLMK)"},
    {ticker: "ROSN", title: "Rosneft (ROSN)"},
    {ticker: "HYDR", title: "RusHydro (HYDR)"},
    {ticker: "RUAL", title: "Rusal (RUAL)"},
    {ticker: "SBER", title: "Sberbank (SBER)"},
    {ticker: "CHMF", title: "Severstal (CHMF)"},
    {ticker: "SNGS", title: "Surgutneftegaz (SNGS)"},
    {ticker: "TATN", title: "Tatneft (TATN)"},
    {ticker: "VTBR", title: "VTB Bank (VTBR)"},
    {ticker: "FIVE", title: "X5 Retail Group (FIVE)"},
    {ticker: "YNDX", title: "Yandex (YNDX)"}
  ];

  let selected;

  async function setData(ticker) {
    const data = await getDataset(ticker);
    candlesticksData.set(data);
  }

  onMount(() => setData(tickers[0].ticker));
</script>

<select bind:value={selected} on:change="{() => setData(selected.ticker)}">
  {#each tickers as tickerData}
    <option value={tickerData}>
      {tickerData.title}
    </option>
  {/each}
</select>
