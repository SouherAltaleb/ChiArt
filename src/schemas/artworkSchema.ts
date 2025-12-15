import { z } from "zod";

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string().default("Unbekannter Title"),
  artisit_title: z.string().nullable().default("Unbekannter Künstler"),
  image_id: z.string().nullable(),
});

//TypeScript-Typ aus Zod ableiten
export type Artwork = z.infer<typeof ArtworkSchema>;
