import { z } from "zod";

export const checkoutSchema = z.object({
 details: z
  .string()
  .trim()
  .min(3, "Address is required"),

phone: z
  .string()
  .regex(/^01[0125][0-9]{8}$/, "Invalid phone"),

city: z
  .string()
  .trim()
  .min(2, "City is required"),

postalCode: z
  .string()
  .min(5, "Postal code is required"),

  type: z.enum(["cash", "visa"]),
});

export type checkoutSchemaType = z.infer<typeof checkoutSchema>;