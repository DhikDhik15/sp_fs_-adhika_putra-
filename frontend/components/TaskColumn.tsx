import { Card } from "@/components/ui/card";
import TaskCard from "./TaskCard";

export const TaskColumn = ({ title, tasks }: { title: string, tasks: any[] }) => (
  <div className="bg-gray-50 rounded-xl p-4 shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="space-y-2">
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
  </div>
);
