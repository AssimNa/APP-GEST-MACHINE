
import { z } from 'zod';

export const scheduleFormSchema = z.object({
  name: z.string().min(3, { message: "Schedule name is required" }),
  machineId: z.string().min(1, { message: "Please select a machine" }),
  frequency: z.string().min(1, { message: "Please select a frequency" }),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date().optional(),
  assignedTo: z.string().min(1, { message: "Please assign to someone" }),
  description: z.string().optional(),
});

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;
