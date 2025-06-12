'use client';
import { useEffect, useState } from 'react';
import socket from '@/lib/socket';
import { TaskColumn } from '@/components/TaskColumn';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [tasks, setTasks] = useState<any[]>([]); // tipe bisa diperjelas
  const projectId = params.id;

  useEffect(() => {
    fetch(`/api/projects/${projectId}/tasks`)
      .then(res => res.json())
      .then(setTasks);

    socket.emit('joinProject', projectId);

    socket.on('taskUpdated', (task) => {
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    });

    socket.on('taskCreated', (task) => {
      setTasks(prev => [...prev, task]);
    });

    socket.on('taskDeleted', (task) => {
      setTasks(prev => prev.filter(t => t.id !== task.id));
    });

    return () => {
      socket.off('taskUpdated');
      socket.off('taskCreated');
      socket.off('taskDeleted');
    };
  }, [projectId]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <TaskColumn title="TODO" tasks={tasks.filter(t => t.status === 'TODO')} />
      <TaskColumn title="IN_PROGRESS" tasks={tasks.filter(t => t.status === 'IN_PROGRESS')} />
      <TaskColumn title="DONE" tasks={tasks.filter(t => t.status === 'DONE')} />
    </div>
  );
}
