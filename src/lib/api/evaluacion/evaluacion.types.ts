import { z } from "zod";
import { baseDtoSchema, BaseFilter } from "../../definitions";
import { evaluacionDetalleDtoSchema } from "../evaluacion-detalle/evaluacion-detalle.types";

export const evaluacionSchema = z.object({
  fecha: z.string(),
  descripcion: z.string(),
  puntaje_general: z.number().default(0),
  pendiente: z.boolean(),
  empleado_id: z.number(),
});

export const evaluacionDtoSchema = baseDtoSchema.merge(evaluacionSchema);

export const createEvaluacionSchema = evaluacionSchema
  .pick({
    fecha: true,
    descripcion: true,
    empleado_id: true,
  })
  .extend({
    criterios: z
      .object({
        criterio: z.string(),
      })
      .array(),
  });

export const evaluacionWithShortDetalles = evaluacionDtoSchema.extend({
  detalles: evaluacionDetalleDtoSchema.array(),
});

export const editarEvaluacionSchema = evaluacionSchema.extend({
  id: z.number(),
  detalles: evaluacionDetalleDtoSchema
    .partial()
    .array(),
});

export type EvaluacionFilter = BaseFilter & {
  descripcion?: string;
  pendiente?: boolean;
  empleado_id?: number;
};
export type CreateEvaluacionType = z.infer<typeof createEvaluacionSchema>;
export type EditEvaluacionDto = z.infer<typeof editarEvaluacionSchema>;
export type EvaluacionWithShortDetallesType = z.infer<
  typeof evaluacionWithShortDetalles
>;
export type EvaluacionType = z.infer<typeof evaluacionSchema>;
export type EvaluacionDtoType = z.infer<typeof evaluacionDtoSchema>;
