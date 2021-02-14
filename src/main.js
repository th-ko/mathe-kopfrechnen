import { uhr } from "/uhr.js"

export function generiereAufgaben() {
  const aufgaben = [
    ...uniqueTimes(5, teilerBestimmenKlein, a => a.html <= 250),
    ...uniqueTimes(3, teilerBestimmenGross, a => a.html <= 250),
    ...uniqueTimes(2, potenzAufgabe),

    // ...uniqueTimes(5, geteiltAufgabe),
    // ...uniqueTimes(4, malAufgabe),
    // ...uniqueTimes(3, minusAufgabe),
    // ...uniqueTimes(3, plusAufgabe),
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

const prim_klein = [2, 3, 5]
const prim_mittel = [7, 11, 13]
const prim_gross = [17, 19, 23]
// const prim_gross = [11, 13, 17, 19, 23, 29, 31, 37]
function teilerBestimmenKlein() {
  const primeCount = zahlZwischen(2, 3)
  const primes = [
    ...times(primeCount, () => auswahl(prim_klein)),
    primeCount === 2 ? auswahl(prim_mittel) : 1,
  ]
  const zahl = produktVon(primes)
  const html = String(zahl)
  // const html = `${zahl} = ${primes.sort().join(",")}`
  const result = listeAllerTeiler(zahl).join(", ")

  function uberpruefe(eingabe) {
    const normalisierteEingabe = eingabe
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .sort((a, b) => a - b)
      .join(", ")
    return result == normalisierteEingabe
  }
  return { html, result, uberpruefe }
}

function teilerBestimmenGross() {
  const primeCount = zahlZwischen(1, 2)
  const primes = [
    ...times(primeCount, () => auswahl(prim_klein)),
    auswahl(prim_gross),
  ]
  const zahl = produktVon(primes)
  const html = String(zahl)
  // const html = `${zahl} = ${primes.sort().join(",")}`
  const result = listeAllerTeiler(zahl).join(", ")

  function uberpruefe(eingabe) {
    const normalisierteEingabe = eingabe
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .sort((a, b) => a - b)
      .join(", ")
    return result == normalisierteEingabe
  }
  return { html, result, uberpruefe }
}

function listeAllerTeiler(zahl) {
  const result = [1]
  for (let i = 2; i <= zahl / 2; i++) {
    if (Number.isInteger(zahl / i)) {
      result.push(i)
    }
  }
  result.push(zahl)
  return result
}

// Aufgabentypen
function plusAufgabe() {
  const a = zahlZwischen(100, 10000)
  const b = zahlZwischen(100, 10000)

  function uberpruefe(eingabe) {
    return eingabe == a + b
  }
  return { html: `${a} + ${b}`, result: a + b, uberpruefe }
}
function minusAufgabe() {
  const [min, max] = [zahlZwischen(100, 10000), zahlZwischen(100, 10000)].sort()

  function uberpruefe(eingabe) {
    return eingabe == max - min
  }
  return { html: `${max} - ${min}`, result: max - min, uberpruefe }
}
function malAufgabe() {
  const a = zahlZwischen(5, 20)
  const b = zahlZwischen(5, 20)
  function uberpruefe(eingabe) {
    return eingabe == a * b
  }
  return {
    html: `${a} * ${b}`,
    result: a * b,
    uberpruefe,
  }
}
function geteiltAufgabe() {
  const a = zahlZwischen(5, 20)
  const b = zahlZwischen(5, 20)
  function uberpruefe(eingabe) {
    return eingabe == a
  }
  return {
    html: `${a * b} : ${b}`,
    result: a,
    uberpruefe,
  }
}
function potenzAufgabe() {
  const chance = zahlZwischen(1, 100)
  const basis = chance < 50 ? 2 : zahlZwischen(1, 9)
  const exponent =
    basis <= 2
      ? zahlZwischen(2, 10)
      : basis <= 6
      ? zahlZwischen(2, 4)
      : zahlZwischen(2, 3)

  function uberpruefe(eingabe) {
    return eingabe == basis ** exponent
  }
  return {
    html: `${basis}<sup>${exponent}</sup>`,
    result: basis ** exponent,
    uberpruefe,
  }
}

// Hilfsfunktionen
function zahlZwischen(von, bis) {
  return Math.round(Math.random() * (bis - von)) + von
}
function produktVon(listeVonZahlen) {
  return listeVonZahlen.reduce((c, x) => c * x, 1)
}
function summeVon(listeVonZahlen) {
  return listeVonZahlen.reduce((c, x) => c + x, 0)
}

function auswahl(liste) {
  const index = Math.round(Math.random() * (liste.length - 1))
  return liste[index]
}

function uniqueTimes(num, func, validate) {
  const hash = new Set()
  const list = new Array()
  while (list.length < num) {
    const aufgabe = func()
    const isNew = !hash.has(aufgabe.html)
    const isValid = typeof validate === 'function' ? validate(aufgabe) : true
    if (isNew & isValid) {
      list.push(aufgabe)
      hash.add(aufgabe.html)
    }
  }
  return list
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

// Anzeige-Funktionen
function aufgabeAnzeigen(aufgabe) {
  const div = document.createElement("div")
  div.className = "aufgabenstellung"
  div.innerHTML = aufgabe.html + " = "

  const input = document.createElement("input")
  // input.type = 'number'
  input.className = "loesung"
  input.onblur = () => {
    if (input.value) {
      uhr()
      input.className = aufgabe.uberpruefe(input.value)
        ? "loesung richtig"
        : "loesung falsch"
    } else {
      input.className = "loesung"
    }
  }

  const content = document.querySelector("#aufgaben")
  content.appendChild(div)
  content.appendChild(input)

  // const mainDiv = document.createElement("div")
  // mainDiv.className = "aufgabe"
  // mainDiv.appendChild(div)
  // mainDiv.appendChild(input)
  // content.appendChild(mainDiv)
}
