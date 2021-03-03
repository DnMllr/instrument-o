<script lang="typescript">
  import * as tone from "tone";

  import Grid from "./components/Grid.svelte";
  import Tracker from "./components/Tracker.svelte";

  import type { SequenceEvent } from "./components/controller";
  import { PlayingState, createSequencer } from "./components/controller";
  import Provider from "./components/Provider.svelte";

  const [sequencer, ctrl] = createSequencer();

  $: flipAll($sequencer.events);

  (window as any).ctrl = ctrl;

  let dragging: number | undefined = undefined;

  let array: number[] = new Array(128).fill(1);

  const NOTES = [
    "C_1",
    "C#_1",
    "D_1",
    "D#_1",
    "E_1",
    "F_1",
    "F#_1",
    "G_1",
    "G#_1",
    "A_1",
    "A#_1",
    "B_1",
    "C0",
    "C#0",
    "D0",
    "D#0",
    "E0",
    "F0",
    "F#0",
    "G0",
    "G#0",
    "A0",
    "A#0",
    "B0",
    "C1",
    "C#1",
    "D1",
    "D#1",
    "E1",
    "F1",
    "F#1",
    "G1",
    "G#1",
    "A1",
    "A#1",
    "B1",
    "C2",
    "C#2",
    "D2",
    "D#2",
    "E2",
    "F2",
    "F#2",
    "G2",
    "G#2",
    "A2",
    "A#2",
    "B2",
    "C3",
    "C#3",
    "D3",
    "D#3",
    "E3",
    "F3",
    "F#3",
    "G3",
    "G#3",
    "A3",
    "A#3",
    "B3",
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4",
    "C5",
    "C#5",
    "D5",
    "D#5",
    "E5",
    "F5",
    "F#5",
    "G5",
    "G#5",
    "A5",
    "A#5",
    "B5",
    "C6",
    "C#6",
    "D6",
    "D#6",
    "E6",
    "F6",
    "F#6",
    "G6",
    "G#6",
    "A6",
    "A#6",
    "B6",
    "C7",
    "C#7",
    "D7",
    "D#7",
    "E7",
    "F7",
    "F#7",
    "G7",
    "G#7",
    "A7",
    "A#7",
    "B7",
    "C8",
    "C#8",
    "D8",
    "D#8",
    "E8",
    "F8",
    "F#8",
    "G8",
    "G#8",
    "A8",
    "A#8",
    "B8",
    "C9",
    "C#9",
    "D9",
    "D#9",
    "E9",
    "F9",
    "F#9",
    "G9",
  ];

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
    <div class="px-16 py-4  max-w-8xl">
      <Grid
        gridState={array}
        currentlyPlaying={$sequencer.playHead.playing === PlayingState.Playing}
        on:dragStart={(e) => (dragging = e.detail.event)}
        on:dragEnd={() => (dragging = undefined)}
        on:play={(e) => flip(e.detail.event, tone.now())}
      />
    </div>
    <div class="px-16 py-4 flex-1 overflow-hidden  max-w-8xl">
      <Tracker {dragging} />
    </div>
  </Provider>
</div>
