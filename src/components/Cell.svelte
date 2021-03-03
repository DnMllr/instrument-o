<script lang="typescript">
  import { createEventDispatcher } from "svelte";
  import { spring } from "svelte/motion";

  export let state: number | boolean = false;
  export let index: number;

  let dispatch = createEventDispatcher();

  const spring1 = spring(1, {
    stiffness: 0.09,
    damping: 0.125,
  });

  const spring2 = spring(1, {
    stiffness: 0.08,
    damping: 0.125,
  });

  const spring3 = spring(1, {
    stiffness: 0.07,
    damping: 0.125,
  });

  const spring4 = spring(1, {
    stiffness: 0.06,
    damping: 0.125,
  });

  const spring5 = spring(1, {
    stiffness: 0.05,
    damping: 0.125,
  });

  const springs = [spring1, spring2, spring3, spring4, spring5];

  let hovering: boolean = false;
  let clicking: boolean = false;
  let dragging: boolean = false;

  function onMouseMove(e: Event) {
    if (clicking) {
      if (!dragging) {
        dispatch("dragStart", {
          event: index,
        });
        dragging = true;
      }
    }
    e.preventDefault();
    return false;
  }

  function onMouseUp(e: Event) {
    if (clicking) {
      if (dragging) {
        dispatch("dragEnd", {
          event: index,
        });
      }
      dispatch("play", {
        event: index,
      });
      dragging = false;
      clicking = false;
    }
  }

  function resolvePlaying(value: number | boolean): number {
    if (value === false) {
      return 1;
    }
    if (value === true) {
      return 1.25;
    }
    return value;
  }

  $: {
    const resolved = resolvePlaying(state);
    springs.forEach((s) => s.set(resolved));
  }
</script>

<svelte:window
  on:mouseup={() => {
    if (dragging) {
      dispatch("dragEnd", {
        event: index,
      });
    }
    dragging = false;
    clicking = false;
  }}
/>

<div
  class="relative h-9 w-9 self-center cursor-pointer rounded-md"
  on:mouseenter={() => (hovering = true)}
  on:mouseleave={() => (hovering = false)}
  on:mousedown={(e) => {
    clicking = true;
    e.preventDefault();
    return false;
  }}
  on:mouseup={clicking ? onMouseUp : undefined}
  on:mousemove={clicking ? onMouseMove : undefined}
>
  <div
    class="absolute w-full h-full text-xs z-50 flex justify-center items-center {hovering
      ? ''
      : 'invisible'}"
  >
    {`0x${index.toString(16).padStart(2, "0")}`}
  </div>
  <div class="relative h-full w-full">
    <div
      class="absolute h-full w-full text-xs rounded-md border-2 border-gray-400 justify-end items-end bg-opacity-70"
      style="transform: scale({$spring1}); z-index: 10;"
    />
    <div
      class="absolute h-full w-full rounded-md border-2 border-blue-300"
      style="transform: scale({$spring2}); z-index: 9;"
    />
    <div
      class="absolute h-full w-full rounded-md border-2 border-green-300"
      style="transform: scale({$spring3}); z-index: 8;"
    />
    <div
      class="absolute h-full w-full rounded-md border-2 border-red-300"
      style="transform: scale({$spring4}); z-index: 7;"
    />
    <div
      class="absolute h-full w-full rounded-md border-2 border-yellow-400"
      style="transform: scale({$spring5}); z-index: 6;"
    />
  </div>
</div>
