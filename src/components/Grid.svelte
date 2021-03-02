<script lang="typescript">
  import Cell from "./Cell.svelte";

  export let playing: (number | boolean)[] = new Array(128).fill(false);
</script>

<div>
  <div class="grid grid-cols-17 grid-rows-9 gap-4">
    <div class="text-xs z-50 flex justify-center items-end">&#60;3</div>
    {#each playing.slice(0, 16) as p, i}
      <div class="text-xs z-50 flex justify-end items-end h-9 w-9 relative">
        {`0x${i.toString(16).padStart(2, "0")}`}
      </div>
    {/each}
    {#each playing as p, i}
      {#if i % 16 === 0}
        <div
          class="text-xs z-50 flex justify-end items-end p-1  h-9 w-9 relative"
        >
          {`0x${i.toString(16).padStart(2, "0")}`}
        </div>
      {/if}
      <Cell playing={p} index={i} />
    {/each}
  </div>
</div>
