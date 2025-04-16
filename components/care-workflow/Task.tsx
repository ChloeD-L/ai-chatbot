export interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  category: "medication" | "hygiene" | "nutrition" | "mobility" | "social" | "other";
  estimatedDuration: number;
  requiredEquipment?: string[];
  safetyNotes?: string;
  complianceNotes?: string;
}
import { Clock, ShieldCheck, FileWarning, FolderOpen } from "lucide-react";

export const Task = ({
  title,
  description,
  status,
  priority,
  category,
  estimatedDuration,
  requiredEquipment,
  safetyNotes,
  complianceNotes,
}: TaskProps) => {
  return (
    <div className="space-y-2 p-4 rounded-xl border shadow-sm bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              priority === "high"
                ? "bg-red-100 text-red-800"
                : priority === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {priority}
          </span>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              status === "completed"
                ? "bg-green-100 text-green-800"
                : status === "in-progress"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-700">{description}</p>

      <div className="grid gap-1 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FolderOpen size={14} />
          <span>Category: {category}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} />
          <span>Estimated Duration: {estimatedDuration} min</span>
        </div>
        {requiredEquipment && requiredEquipment.length > 0 && (
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} />
            <span>Equipment: {requiredEquipment.join(", ")}</span>
          </div>
        )}
        {safetyNotes && (
          <div className="flex items-start gap-2">
            <FileWarning size={14} />
            <span>Safety: {safetyNotes}</span>
          </div>
        )}
        {complianceNotes && (
          <div className="flex items-start gap-2">
            <FileWarning size={14} />
            <span>Compliance: {complianceNotes}</span>
          </div>
        )}
      </div>
    </div>
  );
};
