import { z } from 'zod';

const idValidation = z
  .number()
  .min(1);

const emailValidation = z
  .string()
  .email();

const firstNameValidation = z
  .string()
  .min(2)
  .max(100);

const lastNameValidation = z
  .string()
  .min(2)
  .max(100);

const ageValidation = z
  .number()
  .min(1)

const createdAtValidation = z
  .date()

const updatedAtValidation = z
  .date()

export const createUserSchema = z.object({
  email: emailValidation,
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  age: ageValidation,
});

export const updateUserSchema = z.object({
  email: emailValidation,
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  age: ageValidation,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;