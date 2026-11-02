import type { Dict } from "./en";
import { en } from "./en";
import { id } from "./id";
import type { Locale } from "./config";

export type { Dict };

const dictionaries: Record<Locale, Dict> = { en, id };

export function getDictionary(lang: Locale): Dict {
  return dictionaries[lang];
}

export { fmt } from "./format-client";
