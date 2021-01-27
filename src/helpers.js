export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getFunName() {
  const adjectives = [
    "adorable",
    "beautiful",
    "clean",
    "glittery",
    "elegant",
    "fancy",
    "glamorous",
    "handsome",
    "long",
    "magnificent",
    "vintage",
    "plain",
    "quaint",
    "sparkling",
    "heavy",
    "hand-crafted",
    "tie-dyed",
    "bespoke",
    "curated",
    "retro",
    "lit",
    "fierce",
    "craft",
    "turnt",
    "itchy",
    "fuzzy",
    "snuggly",
    "mysterious",
    "nervous",
    "cuddly",
    "warm",
    "short",
    "fluffy",
    "cute",
    "moist",
    "befuddled"
  ];

  const nouns = [
    "cats",
    "kittens",
    "penguins",
    "teeth",
    "feet",
    "people",
    "leaves",
    "mice",
    "geese",
    "capybaras",
    "snakes",
    "hipsters",
    "socks",
    "unicorns",
    "moustaches",
    "potatoes",
    "tomatoes",
    "cacti",
    "octopi",
    "fungi",
    "officers",
    "elephants",
    "skulls",
    "dinosaurs",
    "lemons",
    "mooses",
    "toes",
    "fingers",
    "noses",
    "eyes"
  ];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}
