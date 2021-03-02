<script lang="typescript">
  import Grid from "./components/Grid.svelte";
  import Tracker from "./components/Tracker.svelte";

  import { createSequencer } from "./components/controller";
  import Provider from "./components/Provider.svelte";

  const [sequencer, ctrl] = createSequencer();

  $: $sequencer.events.forEach((e) => flip(e.play));

  (window as any).ctrl = ctrl;

  let array: number[] = new Array(128).fill(1);

  function flip(i: number) {
    array = array.map((before, j) =>
      i === j ? 0.4 * Math.random() + 1.1 : before
    );
    setTimeout(() => {
      array = array.map((before, j) => (i === j ? 1 : before));
    }, Math.random() * 1000);
  }
</script>

<div class="absolute w-full h-full flex flex-col items-center">
  <Provider {sequencer} {ctrl}>
    <div class="px-16 py-4  max-w-8xl">
      <Grid playing={array} />
    </div>
    <div class="px-16 py-4 flex-1 overflow-hidden  max-w-8xl">
      <Tracker />
    </div>
  </Provider>
</div>
