import { z } from 'zod'

export const authorSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be at least three characters." })
		.max(20, { message: "Name can be a maximum of 20 characters." }),
	date_of_birth: z
		.string()
})

// extract the type from the schema
export type AuthorSchema = z.infer<typeof authorSchema>
