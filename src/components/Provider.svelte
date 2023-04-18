<script lang="ts">
  import type { Observable } from "rxjs";

  import type { Ctrl, State } from "../lib/controller";
  import { setContext } from "../lib/controller";

  export let ctrl: Ctrl;
  export let sequencer: Observable<State>;

  setContext(sequencer, ctrl);
</script>

<slot />
