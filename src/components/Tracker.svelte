<script lang="typescript">
  import TrackerView from "./TrackerView.svelte";
  import { getContext } from "./controller";

  const [sequencer, ctrl] = getContext();

  export let dragging: number | undefined = undefined;

  let activeRow: number = 0;
  let activeCol: number = 0;

  function handleDrop(e: CustomEvent) {
    activeRow = e.detail.row;
    activeCol = e.detail.col;
    ctrl.setEvent(e.detail.col, e.detail.row, e.detail.event);
  }

  function onSet(event: CustomEvent<any>) {
    if (event.detail.nextActive !== undefined) {
      activeRow = event.detail.nextActive.row;
      activeCol = event.detail.nextActive.col;
    }
    ctrl.setEvent(event.detail.col, event.detail.row, event.detail.event);
  }

  function onFocus(event: CustomEvent) {
    activeRow = event.detail.row;
    activeCol = event.detail.col;
  }

  function down() {
    activeRow =
      activeRow < $sequencer.sequence.length - 1
        ? activeRow + 1
        : $sequencer.sequence.length;
  }

  function up() {
    activeRow = activeRow > 0 ? activeRow - 1 : 0;
  }

  function left() {
    activeCol = activeCol > 0 ? activeCol - 1 : 0;
  }

  function right() {
    activeCol = activeCol < 3 ? activeCol + 1 : 3;
  }

  function handleWindowKeydown(event: KeyboardEvent): boolean {
    if (
      document.activeElement != null &&
      document.activeElement != document.body
    ) {
      return true;
    }

    if (event.key === " ") {
      if ($sequencer.playHead.playing) {
        ctrl.stop();
      } else {
        ctrl.play();
      }
    }

    if (event.key === "Shift") {
      return true;
    }

    if (event.key === "j" || event.key === "ArrowDown") {
      down();
    }

    if (event.key === "k" || event.key === "ArrowUp") {
      up();
    }

    if (event.key === "h" || event.key === "ArrowLeft") {
      left();
    }

    if (event.key === "l" || event.key === "ArrowRight") {
      right();
    }

    if (event.key === "Enter") {
      if (event.shiftKey) {
        up();
      } else {
        down();
      }
    }

    if (event.key === "Tab") {
      if (event.shiftKey) {
        left();
      } else {
        right();
      }
    }

    return false;
  }
</script>

<svelte:window on:keydown={handleWindowKeydown} />

<TrackerView
  {activeRow}
  {activeCol}
  {dragging}
  tracker={$sequencer.sequence}
  playingRow={$sequencer.playHead.playing ? $sequencer.playHead.row : undefined}
  on:setEvent={onSet}
  on:focus={onFocus}
  on:drop={handleDrop}
/>
