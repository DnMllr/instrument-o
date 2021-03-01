<script lang="typescript">
  import { onMount } from "svelte";

  import Grid from "./components/Grid.svelte";
  import Tracker from "./components/Tracker.svelte";

  let array: boolean[] = new Array(128).fill(false);

  function flip(i: number) {
    array = array.map((before, j) => (i === j ? !before : before));
    setTimeout(() => {
      array = array.map((before, j) => (i === j ? false : before));
    }, Math.random() * 2000);
  }

  onMount(() => {
    let timeout;

    function doIt() {
      timeout = setTimeout(() => {
        for (let i = 0; i < Math.random() * 4; i++) {
          flip(Math.floor(Math.random() * array.length));
        }
        timeout = setTimeout(doIt);
      }, Math.random() * 500 + 500);
    }

    doIt();

    return () => clearTimeout(timeout);
  });
</script>

<div class="absolute w-full h-full flex flex-col items-center">
  <div class="px-16 py-4  max-w-8xl">
    <Grid playing={array} />
  </div>
  <div class="px-16 py-4 flex-1 overflow-hidden  max-w-8xl">
    <Tracker />
  </div>
</div>
