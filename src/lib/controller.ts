import { BehaviorSubject, combineLatest, interval, Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { getContext as sgetContext, setContext as ssetContext } from "svelte";

export enum PlayingState {
  Stopped,
  Playing,
}

export interface PlayHeadState {
  playing: PlayingState;
  bpm: number;
  row: number;
  bar: number;
  beat: number;
  eighthNote: number;
}

export interface SequenceEvent {
  play: number;
}

export interface State {
  playHead: PlayHeadState;
  sequence: number[][];
  events: SequenceEvent[];
}

export interface Ctrl {
  play(): void;
  stop(): void;
  setEvent(track: number, row: number, event: number): void;
}

const contextKey = {};

export function getContext(): [Observable<State>, Ctrl] {
  return sgetContext(contextKey);
}

export function setContext(sequencer: Observable<State>, ctrl: Ctrl) {
  ssetContext(contextKey, [sequencer, ctrl]);
}

export function createSequencer(): [Observable<State>, Ctrl] {
  const bpm = new BehaviorSubject<number>(120);
  const sequence = new BehaviorSubject<number[][]>(
    new Array(16).fill(-1).map((x) => [x, x, x, x])
  );
  const playing = new BehaviorSubject<PlayingState>(PlayingState.Stopped);

  const ticks = combineLatest([
    playing.asObservable(),
    bpm.asObservable(),
  ]).pipe(
    switchMap(([p, b]) =>
      (p === PlayingState.Playing ? interval(60000 / (b * 8)) : of(0)).pipe(
        map((t) => ({ playing: p, tick: t, bpm: b }))
      )
    )
  );

  const state: Observable<State> = combineLatest([
    ticks,
    sequence.asObservable(),
  ]).pipe(
    map(([t, s]) => {
      const bar = Math.floor(t.tick / 8);
      const beat = Math.floor((t.tick % 8) / 2);
      const eighthNote = Math.floor(t.tick % 8);
      const row = t.tick % s.length;

      const playHeadState = {
        ...t,
        row,
        bar,
        beat,
        eighthNote,
      };

      return {
        playHead: playHeadState,
        sequence: s,
        events:
          t.playing === PlayingState.Playing
            ? s[row].filter((x) => x > -1 && x < 128).map((x) => ({ play: x }))
            : [],
      };
    })
  );

  return [
    state,
    {
      play(): void {
        playing.next(PlayingState.Playing);
      },
      stop(): void {
        playing.next(PlayingState.Stopped);
      },
      setEvent(track: number, row: number, event: number) {
        sequence.next(
          sequence.getValue().map((trackerRow, rowNumber) => {
            if (rowNumber === row) {
              return trackerRow.map((trackerCell, cellNumber) =>
                cellNumber === track ? event : trackerCell
              );
            }
            return trackerRow;
          })
        );
      },
    },
  ];
}
