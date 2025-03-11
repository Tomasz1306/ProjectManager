"use client";
import axios from "axios";
import { DropResult, DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TaskType, BoardType } from "@/types/types";

const Board: React.FC<{ board: BoardType | null }> = ({ board }) => {
  const [tasks, setTasks] = useState<TaskType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log("HALO", board);
  useEffect(() => {
    if (board) {
      setTasks(board.tasks);
      setLoading(false);
    } else {
      // router.push("/home");
    }
  }, [board]);

  //MODAL CONTROLS

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const draggedTask = tasks!.find((task) => task.id === draggableId);

    let updatedStatus: string;

    switch (destination.droppableId) {
      case "todo":
        updatedStatus = "TODO";
        break;
      case "inProgress":
        updatedStatus = "IN_PROGRESS";
        break;
      case "completed":
        updatedStatus = "COMPLETED";
        break;
      case "tested":
        updatedStatus = "TESTED";
        break;
      case "closed":
        updatedStatus = "CLOSED";
        break;
      default:
        updatedStatus = draggedTask!.status;
    }

    const updatedTask = tasks!.map((task) => {
      if (task.id === draggableId) {
        return {
          ...task,
          status: updatedStatus,
        };
      }
      return task;
    });

    setTasks(updatedTask);
  };

  if (loading) {
    return <div>{/* <SyncLoader /> */}</div>;
  }

  return (
    <div className="dark:bg-gray-900 py-10 relative h-screen ">
      <h1 className="font-bold text-center mb-10 text-3xl">
        {board === null ? "BRAK" : board!.name}
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className="grid md:grid-cols-5 max-md:item-center w-[90%] max-w-[1500px]
            mx-auto md:gap-5 gap-10"
        >
          <Column
            title="Todo"
            tasks={tasks!.filter((task) => task.status === "TODO")}
            droppableId="todo"
          />
          <Column
            title="In Progress"
            tasks={tasks!.filter((task) => task.status === "IN_PROGRESS")}
            droppableId="inProgress"
          />
          <Column
            title="Completed"
            tasks={tasks!.filter((task) => task.status === "COMPLETED")}
            droppableId="completed"
          />
          <Column
            title="Tested"
            tasks={tasks!.filter((task) => task.status === "TESTED")}
            droppableId="tested"
          />
          <Column
            title="Closed"
            tasks={tasks!.filter((task) => task.status === "CLOSED")}
            droppableId="closed"
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
