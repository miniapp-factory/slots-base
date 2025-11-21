"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const fruits = ["Apple", "Banana", "Cherry", "Lemon"];

function randomFruit() {
  return fruits[Math.floor(Math.random() * fruits.length)];
}

export default function SlotMachine() {
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: 3 }, () => Array(3).fill(randomFruit()))
  );
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState<string | null>(null);
  const winnerRef = useRef<string | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWin(null);
    winnerRef.current = null;

    const interval = setInterval(() => {
      setGrid((prev) => {
        const newGrid = prev.map((row) => [...row]);
        for (let col = 0; col < 3; col++) {
          for (let row = 2; row > 0; row--) {
            newGrid[row][col] = newGrid[row - 1][col];
          }
          newGrid[0][col] = randomFruit();
        }
        // check win after each update
        for (let r = 0; r < 3; r++) {
          if (
            newGrid[r][0] === newGrid[r][1] &&
            newGrid[r][1] === newGrid[r][2]
          ) {
            winnerRef.current = newGrid[r][0];
          }
        }
        for (let c = 0; c < 3; c++) {
          if (
            newGrid[0][c] === newGrid[1][c] &&
            newGrid[1][c] === newGrid[2][c]
          ) {
            winnerRef.current = newGrid[0][c];
          }
        }
        return newGrid;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
      if (winnerRef.current) {
        setWin(`You win with ${winnerRef.current}s!`);
      }
    }, 2000);
  };

  const winMessage = win ? (
    <div className="mt-4 text-xl font-semibold">
      {win}
      <Share text={`${win} ${url}`} />
    </div>
  ) : null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.flatMap((row, r) =>
          row.map((fruit, c) => (
            <div
              key={`${r}-${c}`}
              className="w-16 h-16 flex items-center justify-center border rounded"
            >
              <img
                src={`/${fruit.toLowerCase()}.png`}
                alt={fruit}
                className="w-12 h-12"
              />
            </div>
          ))
        )}
      </div>
      <Button onClick={spin} disabled={spinning} variant="outline">
        {spinning ? "Spinning..." : "Spin"}
      </Button>
      {winMessage}
    </div>
  );
}
