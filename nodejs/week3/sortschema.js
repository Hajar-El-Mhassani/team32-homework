import { z } from "zod";

const SortColumnEnum = z.enum(["first_name", "last_name", "email"]);
const SortDirectionEnum = z.enum(["asc", "desc"]);

export const sortValidator = z
  .object({
    sort: SortColumnEnum.optional(),
    direction: SortDirectionEnum.optional(),
  })
  .partial();
