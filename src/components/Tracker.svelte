<script lang="typescript">
  export let tracker: number[][] = [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
  ];
</script>

<div class="flex flex-col relative w-full h-full">
  <div
    class="grid grid-cols-4 grid-rows-1 border-b-2 border-gray-500 gap-4 py-1 px-4 text-sm"
  >
    <div>track 1.</div>
    <div>track 2.</div>
    <div>track 3.</div>
    <div>track 4.</div>
  </div>
  <div class="overflow-scroll">
    {#each tracker as row}
      <div class="grid grid-cols-4 grid-rows-1 gap-4 py-1 px-4 text-sm">
        {#each row as event}
          <div>
            {event < 0 || event > 127
              ? "-"
              : `0x${event.toString(16).padStart(2, "0")}`}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
