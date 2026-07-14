import { z } from "zod";

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address");

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name is too long"),
    email: emailSchema,
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number (e.g., 01010700701)"),
    password: passwordSchema,
    rePassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;