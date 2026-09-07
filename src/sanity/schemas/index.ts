import type { SchemaTypeDefinition } from "sanity";
import { trip } from "./trip";
import { itineraryDay } from "./itineraryDay";
import { article } from "./article";

export const schemaTypes: SchemaTypeDefinition[] = [trip, itineraryDay, article];
