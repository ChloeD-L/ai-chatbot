"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from "./Task";
import { Card } from "@/components/ui/card";

interface Task {
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

export default function CareWorkflow() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/care-workflow",
  });

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Chat History and Form */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Care Workflow Assistant</h2>
              <p className="text-gray-600">Describe your care tasks and let AI help organize them</p>
            </div>

            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-description">Describe your care tasks</Label>
                <Input
                  id="task-description"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="e.g., Morning routine for patient John: medication, breakfast, and mobility exercises"
                  className="w-full"
                />
              </div>
              <Button type="submit">Generate Workflow</Button>
            </form>

            {/* Chat History */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chat History</h3>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className="text-sm text-gray-500">{message.role === "user" ? "👤 User:" : "🤖 AI:"}</div>
                    {message.content ? (
                      <div className="text-base text-gray-700">{message.content}</div>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        Generated workflow is displayed on the right side
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Right side - Generated Workflow */}
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Generated Workflow</h2>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  {message.toolInvocations?.map((toolInvocation) => {
                    const { toolName, toolCallId, state } = toolInvocation;
                    if (state === "result" && toolName === "generateCareWorkflow") {
                      const result = toolInvocation.result;
                      const taskArray = Array.isArray(result)
                        ? result
                        : result?.tasks
                        ? result.tasks
                        : result
                        ? [result]
                        : [];

                      if (!Array.isArray(taskArray) || taskArray.length === 0) {
                        return (
                          <div key={toolCallId} className="text-red-600">
                            ⚠️ No valid task(s) returned.
                          </div>
                        );
                      }

                      return (
                        <div key={toolCallId} className="grid gap-4">
                          {taskArray.map((task: Task) => (
                            <Task
                              key={task.id}
                              id={task.id}
                              title={task.title}
                              description={task.description}
                              status={task.status}
                              priority={task.priority}
                              category={task.category}
                              estimatedDuration={task.estimatedDuration}
                              requiredEquipment={task.requiredEquipment}
                              safetyNotes={task.safetyNotes}
                              complianceNotes={task.complianceNotes}
                            />
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
