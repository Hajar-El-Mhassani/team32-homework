import { z } from "zod";

const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.coerce
    .string()
    .min(9, "Phone number must be at least 9 digits")
    .max(10, "Phone number must be at most 10 digits")
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone number must contain only digits",
    }),
});

export default signUpSchema;
