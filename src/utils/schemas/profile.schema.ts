import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullName: z.string().min(4).max(100),
  username: z.string().min(4).max(12),
  bio: z.string().min(5).max(60),
  bannerUrl: z.preprocess(
    (val) => {
      // **Preprocess function (runs before validation):**

      if (typeof FileList !== 'undefined' && val instanceof FileList) {
        // **Browser Environment: FileList is defined and input is a FileList**
        return Array.from(val); // Convert FileList to an array of File objects
      } else {
        // **Non-Browser Environment: FileList is NOT defined (or input is not FileList)**
        return []; // Return an empty array as a default value
      }
    },
    // **Schema to validate the *preprocessed* value:**
    z.array(z.instanceof(File)).optional()
  ),
  avatarUrl: z.preprocess(
    (val) => {
      // **Preprocess function (runs before validation):**

      if (typeof FileList !== 'undefined' && val instanceof FileList) {
        // **Browser Environment: FileList is defined and input is a FileList**
        return Array.from(val); // Convert FileList to an array of File objects
      } else {
        // **Non-Browser Environment: FileList is NOT defined (or input is not FileList)**
        return []; // Return an empty array as a default value
      }
    },
    // **Schema to validate the *preprocessed* value:**
    z.array(z.instanceof(File)).optional()
  ),
});
export type ProfileUpdateSchemaDTO = z.infer<typeof updateProfileSchema>;
