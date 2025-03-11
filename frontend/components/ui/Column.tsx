import { Droppable, Draggable } from "@hello-pangea/dnd";
import { LuDot } from "react-icons/lu";
import { useState } from "react";

import { TaskType } from "@/types/types";

interface ColumnProps {
  title: string;
  tasks: TaskType[];
  droppableId: string;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, droppableId }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  //modal state here

  //modal functions

  return (
    <div className="flex-1 border-1">
      <div className="flex gap-1">
      <LuDot></LuDot>
        <h2 className="dark:text-white text-sm font-semibold mb-4 uppercase">
          {title}
        </h2>
        
      </div>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="dark:bg-gray-800 bg-gray-200 rounded-lg p-4"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    className="bg-gray-700 rounded p-2 mb-2 text-white flex justify-between"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    {task.name}
                    {hoverIndex === index && (
                      <div className="flex gap-5">
                        <div className="text-xs text-gray-400 cursor-pointer">
                          Edit
                        </div>
                        <div className="text-xs text-gray-400 cursor-pointer">
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
