"use client";

import { title } from "@/components/primitives";
import Board from "@/components/ui/Board";
import { useState, useEffect } from "react";
import { TaskType, BoardType } from "@/types/types";
export default function KanbanPage() {
  const [myBoard, setMyBoard] = useState<BoardType | null>(null);
  const tmpTask1: TaskType = {
    id: "1",
    status: "COMPLETED",
    name: "pierwszy",
  };
  const tmpTask2: TaskType = {
    id: "4",
    status: "COMPLETED",
    name: "pierwszy",
  };
  const tmpTask3: TaskType = {
    id: "5",
    status: "COMPLETED",
    name: "pierwszy",
  };
  const tmpTask4: TaskType = {
    id: "2",
    status: "IN_PROGRESS",
    name: "drugi",
  };

  const tmpBoard: BoardType = {
    tasks: [tmpTask1, tmpTask2, tmpTask3 ,tmpTask4],
    id: "1",
    name: "tablica",
  };
  useEffect(() => {
    setMyBoard(tmpBoard);
  }, []);
  return (
    <div className="">
      <Board board={myBoard}></Board>
    </div>
  );
}
