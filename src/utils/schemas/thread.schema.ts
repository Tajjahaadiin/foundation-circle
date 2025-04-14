// import { z } from 'zod';

// export const createThreadSchema = z.object({
//   content: z.string().max(280),
//   images: z.instanceof(FileList),
// });

// export type CreateThreadSchemaDTO = z.infer<typeof createThreadSchema>;

import { z } from 'zod';

export const createThreadSchema = z.object({
  content: z.string().max(280, { message: 'Maksimal 280 karakter' }),
  images: z.preprocess(
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
export const updateThreadSchema = z.object({
  threadId: z.string().max(280),
  content: z.string().max(280, { message: 'Maksimal 280 karakter' }),
  images: z.preprocess(
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
export type CreateThreadSchemaDTO = z.infer<typeof createThreadSchema>;

export type UpdateThreadSchemaDTO = z.infer<typeof updateThreadSchema> & {
  threadId: string;
};
