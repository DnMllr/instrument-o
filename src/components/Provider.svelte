<script lang="typescript">
  import type { Observable } from "rxjs";

  import type { Ctrl, State } from "./controller";
  import { setContext } from "./controller";

  export let ctrl: Ctrl;
  export let sequencer: Observable<State>;

  setContext(sequencer, ctrl);
</script>

<slot />
