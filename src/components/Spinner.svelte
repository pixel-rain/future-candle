<script>
  import { onDestroy } from "svelte";

  const colors = ["red", "orange", "blue", "green", "violet"];

  let colorIndices = [0, 1, 2, 3, 4];

  $: firstColor = colors[colorIndices[0]];
  $: secondColor = colors[colorIndices[1]];
  $: thirdColor = colors[colorIndices[2]];
  $: fourthColor = colors[colorIndices[3]];
  $: fifthColor = colors[colorIndices[4]];

  function updateIndices() {
    colorIndices = colorIndices.map((val) => (val === 0 ? 4 : val - 1));
  }

  const interval = setInterval(updateIndices, 500);

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<style>
  svg {
    height: 100px;
    width: 100px;
    transform: rotate(180deg);
  }
  circle {
    stroke-width: 25px;
    fill: transparent;
  }
  #first {
    stroke-dasharray: 10, 125.6; /* length of arc, circumference of circle */
    stroke-dashoffset: 0; /* offset of arc from start point */
  }
  #second {
    stroke-dasharray: 10, 125.6; /* length of arc, circumference of circle */
    stroke-dashoffset: -25.12; /* offset of arc from start point (1/5 circumference) */
  }
  #third {
    stroke-dasharray: 10, 125.6; /* length of arc, circumference of circle */
    stroke-dashoffset: -50.24; /* offset of  arc from start point (2/5 circumference) */
  }
  #fourth {
    stroke-dasharray: 10, 125.6; /* length of arc, circumference of circle */
    stroke-dashoffset: -75.36; /* offset of arc from start point (3/5 circumference) */
  }

  #fifth {
    stroke-dasharray: 10, 125.6; /* length of arc, circumference of circle */
    stroke-dashoffset: -100.48; /* offset of arc from start point (4/5 circumference) */
  }
</style>

<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="20" id="first" style={`stroke: ${firstColor};`} />
  <circle
    cx="50"
    cy="50"
    r="20"
    id="second"
    style={`stroke: ${secondColor};`} />
  <circle cx="50" cy="50" r="20" id="third" style={`stroke: ${thirdColor};`} />
  <circle
    cx="50"
    cy="50"
    r="20"
    id="fourth"
    style={`stroke: ${fourthColor};`} />
  <circle cx="50" cy="50" r="20" id="fifth" style={`stroke: ${fifthColor};`} />
</svg>
