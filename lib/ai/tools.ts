import { tool as createTool } from "ai";
import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().describe("A unique identifier for the task"),
  title: z.string().describe("The title of the task"),
  description: z.string().describe("A detailed description of the task"),
  status: z.enum(["pending", "in-progress", "completed"]).describe("The current status of the task"),
  priority: z.enum(["low", "medium", "high"]).describe("The priority of the task"),
  category: z
    .enum(["medication", "hygiene", "nutrition", "mobility", "social", "other"])
    .describe("The category of the task"),
  estimatedDuration: z.number().describe("Estimated duration of the task in minutes"),
  requiredEquipment: z.array(z.string()).optional().describe("Any equipment needed for the task"),
  safetyNotes: z.string().optional().describe("Important safety considerations for the task"),
  complianceNotes: z.string().optional().describe("Notes about compliance requirements for the task"),
});

export const careWorkflowTool = createTool({
  description: "Generate a care workflow with tasks for patient care",
  parameters: z.object({
    patientName: z.string().describe("The name of the patient"),
    careDescription: z.string().describe("Description of the care needs and requirements"),
    tasks: z.array(taskSchema).describe("List of tasks to be performed"),
  }),
  execute: async function ({ patientName, careDescription, tasks }) {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      patientName,
      careDescription,
      tasks: tasks.map((task) => ({
        ...task,
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID for each task
      })),
    };
  },
});

export const tools = {
  generateCareWorkflow: careWorkflowTool,
};
