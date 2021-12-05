export function getPuzzle(mode) {
  console.log("Mode:",mode);
  return fetch(
    `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${mode}`
  ).then((data) => data.json());
}
