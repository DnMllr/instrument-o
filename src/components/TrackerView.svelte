<script lang="ts">
  import { colorBorders } from "../lib/colorset";
  import TrackerCell from "./TrackerCell.svelte";

  export let tracker: number[][] = [];
  export let activeRow: number = 0;
  export let activeCol: number = 0;
  export let playingRow: number | undefined = undefined;
  export let dragging: number | undefined = undefined;

  function rowBG(
    r: number,
    playingRow: number | undefined,
    activeRow: number
  ): string {
    let classes = "";

    if (playingRow !== undefined && r < playingRow) {
      classes += " transition-all ";
    }

    if (r === activeRow) {
      return classes + "bg-gray-200";
    }

    return classes;
  }

  function rowBorder(r: number, playingRow: number | undefined): string {
    if (r === playingRow) {
      return ` ${colorBorders[r % colorBorders.length]} `;
    }

    if (r % 8 === 0) {
      return "border-t border-gray-500";
    }

    if (r % 4 === 0) {
      return "border-t border-gray-400";
    }

    if (r % 2 === 0) {
      return "border-t border-gray-300";
    }

    return "border-gray-200";
  }
</script>

<div class="flex flex-col relative w-full h-full">
  <div
    class="grid grid-cols-4 grid-rows-1 border-b-2 gap-8 border-gray-500 py-1 text-sm"
  >
    <div>track 1.</div>
    <div>track 2.</div>
    <div>track 3.</div>
    <div>track 4.</div>
  </div>
  <div class="overflow-scroll">
    {#each tracker as row, r}
      <div
        class="grid grid-cols-4 grid-rows-1 gap-8 text-sm border-l-8 border-r-8 border-t {rowBG(
          r,
          playingRow,
          activeRow
        )} {rowBorder(r, playingRow)}"
      >
        {#each row as event, col}
          <TrackerCell
            {event}
            {activeCol}
            {activeRow}
            {col}
            {dragging}
            row={r}
            rowCount={tracker.length}
            on:setEvent
            on:focus
            on:drop
          />
        {/each}
      </div>
    {/each}
  </div>
</div>
