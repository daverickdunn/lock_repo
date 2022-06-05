export const SPORTS = [
  "soccer",
  "cricket",
  "golf",
  "rugby",
  "hurling",
  "hockey",
  "football",
  "baseball",
  "basketball",
];
const PUBLISHER_NAMES = [
  "One Sport",
  "Two Sport",
  "Three Sport",
  "Four Sport",
  "Five Sport",
];
export const PUBLISHERS = PUBLISHER_NAMES.map((name, i) => {
  const domain = name.toLowerCase().split(" ").join("");
  return {
    id: i + 1,
    name,
    domain: `https://${domain}.com`,
  };
});
