// 1. Art Institute of Chicago API abfragt
// 2. Antwort verarbeitet
// 3.jedes Kunstwerk mit Zod validiert
// Such-API liefert: id, title, artist_title, image_id

import { ArtworkSchema, Artwork } from "../schemas/artworkSchema";

const API_URL = "https://api.artic.edu/api/v1/artworks/search";

// encodeURIComponent(query): URLs dürfen keine Leerzeichen oder Sonderzeichen enthalten
// query: Suchtext
//Promise<Artwork[]>: Funktion gibt später ein Array zurück

export async function searchArtworks(query: string): Promise<Artwork[]> {
  // auf anwort von server warten
  const response = await fetch(
    `${API_URL}?q=${encodeURIComponent(
      query
    )}&limit=10&fields=id,title,artist_title,image_id `
  );

  if (!response.ok) {
    throw new Error("API request failed");
  }
  // Antwort → JSON umwandeln
  const json = await response.json();

  // Nur valide Artworks kommen rein
  const artworks: Artwork[] = [];

  // api liefert data als array, elemnt für element durch gehen
  for (const item of json.data) {
    // prüft, stimmt die Struktur, keine crash,
    const parsed = ArtworkSchema.safeParse(item);
    // Wenn gültig → ins Array speichern
    if (parsed.success) {
      artworks.push(parsed.data);
    } else {
      console.warn("Ungültiges Artwork übersprungen", parsed.error);
    }
  }

  return artworks;
}
