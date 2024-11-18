import {z} from "zod"
import { baseDtoSchema } from "../../definitions"

export const evaluacionDetalleSchema = z.object({
  evaluacion_id: z.number().optional(),
  criterio: z.string(),
  puntaje: z.coerce.number().min(0).max(100).optional().default(0),
  comentarios: z.string().max(512).optional(),
})

export const evaluacionDetalleDtoSchema = baseDtoSchema.merge(evaluacionDetalleSchema)

export type EvaluacionDetalleType = z.infer<typeof evaluacionDetalleSchema>
export type EvaluacionDetalleDtoType = z.infer<typeof evaluacionDetalleDtoSchema>