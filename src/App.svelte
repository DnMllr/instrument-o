<script lang="ts">
  import * as tone from "tone";

  import Grid from "./components/Grid.svelte";
  import Tracker from "./components/Tracker.svelte";
  import Provider from "./components/Provider.svelte";

  import type { SequenceEvent } from "./lib/controller";
  import { PlayingState, createSequencer } from "./lib/controller";
  import { makeNotes } from "./lib/notes";

  const [sequencer, ctrl] = createSequencer();

  $: flipAll($sequencer.events);

  (window as any).ctrl = ctrl;

  let dragging: number | undefined = undefined;

  let array: number[] = new Array(128).fill(1);

  const NOTES = makeNotes();

  const startAt = 24;

  const synths = new Array(128).fill(undefined);

  function playNote(i: number, now: number) {
    if (synths[i] === undefined) {
      synths[i] = new tone.Synth().toDestination();
    }
    const note = NOTES[startAt + Math.floor(i / 16) * 7 + (i % 16)];
    synths[i].triggerAttackRelease(note, "8n", now);
  }

  function flipAll(events: SequenceEvent[]) {
    const now = tone.now();
    events.forEach(({ play }) => flip(play, now));
  }

  function flip(i: number, now: number) {
    array = array.map((before, j) =>
      i === j ? 0.4 * Math.random() + 1.1 : before
    );

    playNote(i, now);

    setTimeout(() => {
      array = array.map((before, j) => (i === j ? 1 : before));
    }, 200);
  }

  $: {
    if (dragging !== undefined) {
      document.body.style.cursor = "grabbing";
    } else {
      document.body.style.cursor = "";
    }
  }
</script>

<div class="absolute w-full h-full flex flex-col items-center">
  <Provider {sequencer} {ctrl}>
    <div class="px-16 py-4 max-w-8xl">
      <Grid
        gridState={array}
        currentlyPlaying={$sequencer.playHead.playing === PlayingState.Playing}
        on:dragStart={(e) => (dragging = e.detail.event)}
        on:dragEnd={() => (dragging = undefined)}
        on:play={(e) => flip(e.detail.event, tone.now())}
      />
    </div>
    <div class="px-16 py-4 flex-1 overflow-hidden max-w-8xl">
      <Tracker {dragging} />
    </div>
  </Provider>
</div>
