// src/Day2/WorldData.jsx

export const continents = [
  { name: "Asia", description: "The largest continent by both area and population. Home to diverse cultures, languages, and economies." },
  { name: "Africa", description: "Known for its rich natural resources and diverse wildlife. Second-largest continent by land area." },
  { name: "North America", description: "Includes Canada, the United States, Mexico, and Central American countries." },
  { name: "South America", description: "Famous for the Amazon rainforest and Andes mountains. Rich in culture and biodiversity." },
  { name: "Antarctica", description: "A polar continent covered in ice. The coldest place on Earth and mostly uninhabited." },
  { name: "Europe", description: "A continent rich in history and modern development. Includes countries like France, Germany, and Italy." },
  { name: "Australia", description: "The smallest continent and a country. Known for its unique wildlife and landscapes." }
];

export const oceans = [
  { name: "Pacific Ocean", description: "The largest and deepest ocean on Earth, covering more than 30% of the planet's surface. It lies between Asia and the Americas." },
  { name: "Atlantic Ocean", description: "The second-largest ocean, separating the Americas from Europe and Africa. Known for the Gulf Stream and historical trade routes." },
  { name: "Indian Ocean", description: "The third-largest ocean, bordered by Africa, Asia, and Australia. Important for trade and monsoon systems." },
  { name: "Southern Ocean", description: "Encircles Antarctica and is the newest recognized ocean. Known for strong currents and icy conditions." },
  { name: "Arctic Ocean", description: "The smallest and shallowest ocean, located around the North Pole. Covered in sea ice much of the year." }
];

export const oceansAndContinents = [...continents, ...oceans];
