import { z } from "zod";

// Notes
export const NoteSchema = z.string().max(200, "Maximal 200 Zeichen").optional();

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string().default("Unbekannter Title"),
  artist_title: z.string().nullable().default("Unbekannter Künstler"),
  image_id: z.string().nullable(),
  note: NoteSchema,
});

//TypeScript-Typ aus Zod ableiten
export type Artwork = z.infer<typeof ArtworkSchema>;
