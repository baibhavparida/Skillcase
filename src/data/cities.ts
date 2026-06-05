export type GermanCitySnapshot = {
  slug: string;
  name: string;
  monthlyRent: string;
  indianCommunity: "Small" | "Growing" | "Large";
  transport: "Excellent" | "Good";
  climate: string;
  indianGroceries: "Several" | "Few" | "Many";
  vibe: string;
};

export const CITIES: GermanCitySnapshot[] = [
  {
    slug: "hamburg",
    name: "Hamburg",
    monthlyRent: "€720–€950",
    indianCommunity: "Growing",
    transport: "Excellent",
    climate: "Mild · rainy winters",
    indianGroceries: "Several",
    vibe: "Port city, multicultural, strong public transport",
  },
  {
    slug: "aachen",
    name: "Aachen",
    monthlyRent: "€550–€780",
    indianCommunity: "Small",
    transport: "Good",
    climate: "Mild · close to Belgium border",
    indianGroceries: "Few",
    vibe: "Cosy university town, walkable, lower cost of living",
  },
  {
    slug: "berlin",
    name: "Berlin",
    monthlyRent: "€800–€1,100",
    indianCommunity: "Large",
    transport: "Excellent",
    climate: "Cool · long winters",
    indianGroceries: "Many",
    vibe: "Cosmopolitan capital, Indian community in Neukölln, art and food scene",
  },
  {
    slug: "munich",
    name: "Munich",
    monthlyRent: "€950–€1,300",
    indianCommunity: "Growing",
    transport: "Excellent",
    climate: "Continental · snowy winters",
    indianGroceries: "Several",
    vibe: "High-paying south, near Alps, premium hospitals",
  },
  {
    slug: "frankfurt",
    name: "Frankfurt",
    monthlyRent: "€820–€1,050",
    indianCommunity: "Large",
    transport: "Excellent",
    climate: "Mild · short winters",
    indianGroceries: "Many",
    vibe: "Direct flights to India, financial hub, strong Indian community",
  },
];

export function getCity(slug: string): GermanCitySnapshot | undefined {
  return CITIES.find((c) => c.slug === slug);
}
