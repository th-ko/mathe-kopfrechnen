let startTime
let timer

function pad(num) {
  return num >= 10 ? "" + num : "0" + num
}

function starteUhr() {
  startTime = Date.now()
  const uhr = document.getElementById("uhr")
  timer = setInterval(() => {
    const secondsPassed = Math.floor((Date.now() - startTime) / 1000)
    const min = Math.floor(secondsPassed / 60)
    const sec = secondsPassed % 60
    uhr.innerText =
      secondsPassed < 3600
        ? `${pad(min)}:${pad(sec)}`
        : `${pad(hour)}:${pad(min)}:${pad(sec)}`
  }, 1000)
}
function stoppeUhr() {
  clearTimeout(timer)
}

export function uhr() {
  if (startTime === undefined) {
    starteUhr()
  }
  const alleLoesungen = document.body.querySelectorAll(".loesung")
  const alleRichtig = document.body.querySelectorAll(".richtig")
  if (alleLoesungen.length === alleRichtig.length) {
    stoppeUhr()
  }
}
