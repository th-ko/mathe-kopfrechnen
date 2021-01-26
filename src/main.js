import { uhr } from "/uhr.js"

export function generiereAufgaben() {
  const aufgaben = [
    ...times(5, potenzAufgabe),
    ...times(5, geteiltAufgabe),
    ...times(4, malAufgabe),
    ...times(3, minusAufgabe),
    ...times(3, plusAufgabe),
  ]
  mischen(aufgaben).forEach(aufgabeAnzeigen)
}

// function term() {
//   const a = zahlZwischen(10, 100)
//   const b = zahlZwischen(10, 100)
//   const potenz = zahlZwischen(10, 100)

//   return {
//     html: `${a} * ${b}`,
//     result: a * b,
//   }
// }

// function strichAufgabe() {
//   const a = zahlZwischen(10, 100)
//   const b = zahlZwischen(10, 100)
//   const chance = zahlZwischen(1, 100)

//   if (chance > 50) {
//     return {
//       html: `${a} + ${b}`,
//       result: a + b,
//     }
//   } else {
//     return a > b
//       ? { html: `${a} - ${b}`, result: a - b }
//       : { html: `${b} - ${a}`, result: b - a }
//   }
// }

// Aufgabentypen
function plusAufgabe() {
  const a = zahlZwischen(100, 10000)
  const b = zahlZwischen(100, 10000)
  return { html: `${a} + ${b}`, result: a + b }
}
function minusAufgabe() {
  const a = zahlZwischen(100, 10000)
  const b = zahlZwischen(100, 10000)
  return a > b
    ? { html: `${a} - ${b}`, result: a - b }
    : { html: `${b} - ${a}`, result: b - a }
}
function malAufgabe() {
  const a = zahlZwischen(5, 20)
  const b = zahlZwischen(5, 20)
  return {
    html: `${a} * ${b}`,
    result: a * b,
  }
}
function geteiltAufgabe() {
  const a = zahlZwischen(5, 20)
  const b = zahlZwischen(5, 20)
  return {
    html: `${a * b} : ${b}`,
    result: a,
  }
}
function potenzAufgabe() {
  const chance = zahlZwischen(1, 100)
  const basis = chance < 50 ? 2 : zahlZwischen(1, 9)
  const exponent =
    basis <= 2
      ? zahlZwischen(2, 10)
      : basis <= 6
      ? zahlZwischen(0, 4)
      : zahlZwischen(2, 3)
  return {
    html: `${basis}<sup>${exponent}</sup>`,
    result: basis ** exponent,
  }
}

// Hilfsfunktionen
function zahlZwischen(von, bis) {
  return Math.round(Math.random() * (bis - von)) + von
}

function times(num, func) {
  const list = new Array(num)
  for (let i = 0; i < num; i++) {
    list[i] = func()
  }
  return list
}

function mischen(liste) {
  const neueListe = liste.slice()
  for (let i = neueListe.length - 1; i >= 0; i--) {
    const r = Math.round(Math.random() * i)
    const card = neueListe[r]
    neueListe[r] = neueListe[i]
    neueListe[i] = card
  }
  return neueListe
}

function aufgabeAnzeigen(aufgabe) {
  const div = document.createElement("div")
  div.className = "aufgabenstellung"
  div.innerHTML = aufgabe.html + " = "

  const input = document.createElement("input")
  input.type = 'number'
  input.className = "loesung"
  input.onblur = ueberpruefeErgebnis(input, aufgabe.result)

  const mainDiv = document.createElement("div")
  mainDiv.className = "aufgabe"
  mainDiv.appendChild(div)
  mainDiv.appendChild(input)

  const content = document.querySelector("#aufgaben")
  content.appendChild(mainDiv)
}

function ueberpruefeErgebnis(input, richtigesErgebnis) {
  return () => {
    if (input.value) {
      uhr()

      input.className =
        input.value == richtigesErgebnis //
          ? "loesung richtig"
          : "loesung falsch"
    } else {
      input.className = "loesung"
    }
  }
}
