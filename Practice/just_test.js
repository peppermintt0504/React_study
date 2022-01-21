const dogs = ["검은 강아지", "노란 강아지", "흰 강아지"];
const cats = ["검은 고양이", "복슬 고양이", "노란 고양이"];

let animals = [new Set([...dogs, ...cats])];

console.log(animals);