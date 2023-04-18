<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let event: number;
  export let col: number;
  export let row: number;
  export let activeRow: number;
  export let activeCol: number;
  export let rowCount: number;
  export let dragging: number | undefined = undefined;

  let dispatch = createEventDispatcher();

  let text: string;

  $: text = eventToString(event);

  function eventToString(event: number): string {
    return event < 0 || event > 127
      ? "-"
      : `0x${event.toString(16).padStart(2, "0")}`;
  }

  function cellBackground(
    c: number,
    r: number,
    activeRow: number,
    activeCol: number
  ): string {
    return c === activeCol
      ? r === activeRow
        ? "bg-gray-100"
        : "bg-gray-200"
      : "";
  }

  function cellBorder(
    c: number,
    r: number,
    activeRow: number,
    activeCol: number
  ): string {
    if (c === activeCol && r === activeRow) {
      return " border border-white ";
    }
    return " p-px ";
  }

  let nextActive: { col: number; row: number } | undefined;

  function handleBlur() {
    let trimmed = text.trim();
    if (trimmed === "" || trimmed === "-" || trimmed === "d") {
      text = "-";
      dispatch("setEvent", {
        event: -1,
        col,
        row,
        nextActive,
      });
      return;
    }
    try {
      let i = parseInt(trimmed, 16);
      if (isNaN(i)) {
        if (previousText) {
          text = previousText;
          previousText = "";
        } else {
          text = eventToString(event);
        }
      } else {
        text = eventToString(i);
        dispatch("setEvent", {
          event: parseInt(trimmed, 16),
          col,
          row,
          nextActive,
        });
      }
    } catch {
      if (previousText) {
        text = previousText;
        previousText = "";
      } else {
        text = eventToString(event);
      }
    }
    nextActive = undefined;
  }

  let previousText: string = "";

  function handleFocus() {
    if (text !== "-") {
      previousText = text;
    }

    text = "";

    dispatch("focus", {
      col,
      row,
    });
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        if (e.key === "Enter") {
          nextActive = {
            row: row > 0 ? row - 1 : rowCount - 1,
            col,
          };
        } else {
          nextActive = {
            col: col > 0 ? col - 1 : 3,
            row,
          };
        }
      } else {
        if (e.key === "Enter") {
          nextActive = {
            row: (row + 1) % rowCount,
            col,
          };
        } else {
          nextActive = {
            col: (col + 1) % 4,
            row,
          };
        }
      }
      (e.target as any)?.blur();
    } else {
      nextActive = undefined;
    }

    e.stopPropagation();

    return e.key !== "Enter";
  }

  function handleMouseup() {
    if (dragging) {
      dispatch("drop", {
        col,
        row,
        event: dragging,
      });
    }
  }

  let el: HTMLDivElement;

  function handleWindowKeydown(
    event: KeyboardEvent,
    c: number,
    r: number,
    activeRow: number,
    activeCol: number
  ) {
    if (
      document.activeElement != null &&
      document.activeElement != document.body
    ) {
      return;
    }

    if (event.key === " ") {
      return false;
    }

    if (event.key === "Shift") {
      return true;
    }

    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      return false;
    }

    if (event.key !== "x" && isNaN(parseInt(event.key)) && event.key !== "d") {
      return false;
    }

    if (c === activeCol && r === activeRow) {
      if (event.key === "d") {
        previousText = "";
        dispatch("setEvent", {
          event: -1,
          col: c,
          row: r,
        });
        return false;
      }
      el.focus();
    }

    return event.key !== "Enter";
  }
</script>

<svelte:window
  on:keydown={(e) => handleWindowKeydown(e, col, row, activeRow, activeCol)}
/>

<div
  class="outline-none {cellBackground(
    col,
    row,
    activeRow,
    activeCol
  )} {cellBorder(col, row, activeRow, activeCol)}"
  contenteditable
  on:mouseup={handleMouseup}
  on:focus={handleFocus}
  on:blur={handleBlur}
  on:keydown={handleKeydown}
  bind:this={el}
  bind:textContent={text}
/>
