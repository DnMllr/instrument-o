// prettier-ignore
const NAMES = [
  "C",
    "C#",
  "D",
    "D#",
  "E",
  "F",
    "F#",
  "G",
    "G#",
  "A",
    "A#",
  "B",
];

const MAX_NOTE = "G9";
export const NOTES: string[] = makeNotes();

export function makeNotes(): string[] {
  let note = "";
  let octave = -1;
  let name = 0;
  const notes = [];

  while (note !== MAX_NOTE) {
    const o = octave < 0 ? `_${Math.abs(octave)}` : `${octave}`;
    note = `${NAMES[name]}${o}`;
    notes.push(note);

    name++;
    if (name >= NAMES.length) {
      name = 0;
      octave++;
    }
  }

  return notes;
}
