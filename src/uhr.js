let startTime
let timer

function pad(num) {
  return num >= 10 ? "" + num : "0" + num
}

function starteUhr() {
  startTime = Date.now()
  const uhr = document.getElementById("uhr")
  timer = setInterval(() => {
    const timePassed = Math.floor((Date.now() - startTime) / 1000)
    const min = Math.floor(timePassed / 60)
    const sec = timePassed % 60
    if (timePassed < 3600) {
      uhr.innerText = `${pad(min)}:${pad(sec)}`
    } else {
      uhr.innerText = `${pad(hour)}:${pad(min)}:${pad(sec)}`
    }
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
  const alleBewertet = document.body.querySelectorAll(".falsch")
  if (alleLoesungen.length === alleBewertet.length) {
    stoppeUhr()
  }
}
