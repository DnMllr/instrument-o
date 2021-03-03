<script lang="typescript">
  import Cell from "./Cell.svelte";

  export let gridState: (number | boolean)[] = new Array(128).fill(false);
  export let currentlyPlaying: boolean = false;
</script>

<div>
  <div class="grid grid-cols-17 grid-rows-9 gap-4">
    <div class="text-xs z-50 flex justify-center items-end">
      {currentlyPlaying ? "<3" : "</3"}
    </div>
    {#each gridState.slice(0, 16) as p, i}
      <div class="text-xs z-50 flex justify-end items-end h-9 w-9 relative">
        {`0x${i.toString(16).padStart(2, "0")}`}
      </div>
    {/each}
    {#each gridState as p, i}
      {#if i % 16 === 0}
        <div
          class="text-xs z-50 flex justify-end items-end p-1  h-9 w-9 relative"
        >
          {`0x${i.toString(16).padStart(2, "0")}`}
        </div>
      {/if}
      <Cell state={p} index={i} on:dragStart on:dragEnd on:play />
    {/each}
  </div>
</div>
