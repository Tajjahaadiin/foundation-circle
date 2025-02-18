import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(4),
  userName: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(4),
});
export type RegisterSchemaDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  loginId: z
    .string()
    .min(4, { message: 'Input must be at least 4 characters' })
    .refine(
      (value) => {
        if (value.includes('@')) {
          try {
            z.string().email().parse(value); // Attempt email validation
            return true; // If email validation succeeds, it's valid
          } catch (emailError) {
            console.error(emailError);
            return false; // If email validation fails, it's invalid as email
          }
        } else {
          try {
            z.string().min(4).parse(value); // Attempt username validation (min length already checked, but re-parsing for clarity)
            return true; // If username validation (min length) succeeds, it's valid as username
          } catch (usernameError) {
            console.error('user', usernameError);
            return false; // If username validation fails, it's invalid as username
          }
        }
      },
      {
        message: 'Invalid email format or username too short', // Generic error message, refine as needed
      }
    ),
  password: z.string().min(4),
});
export type LoginSchemaDTO = z.infer<typeof loginSchema>;
export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordSchemaDTO = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ['password'],
  });
export type ResetPasswordSchemaDTO = z.infer<typeof resetPasswordSchema>;
