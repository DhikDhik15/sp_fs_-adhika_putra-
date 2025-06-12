import { Card } from "@/components/ui/card";

export default function TaskCard({ task }: { task: any }) {
  return (
    <Card className="p-4">
      <p className="font-medium">{task.title}</p>
      <p className="text-sm text-gray-500">{task.description}</p>
    </Card>
  );
}
