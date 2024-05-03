import { Game } from "../components/autocomplete/Autocomplete.types";

async function getData(name: string) {
  const result = await fetch(
    "https://www.cheapshark.com/api/1.0/games?title=" + name
  );

  // Filtering the data because the api returns trimmered titles, so we avoid that "ABC" would match "AB C"
  return (await result.json()).filter((g: Game) =>
    g.external.toLowerCase().includes(name.toLowerCase())
  );
}

export default getData;
