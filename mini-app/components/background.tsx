"use client";

import { useEffect } from "react";

export default function Background() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes rain {
        0% { transform: translateY(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(100%); opacity: 0; }
      }
      .rain-drop {
        position: absolute;
        top: -10px;
        width: 2px;
        height: 15px;
        background: rgba(255,255,255,0.5);
        animation: rain 1s linear infinite;
      }
      .lightning {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.8);
        opacity: 0;
        animation: flash 5s linear infinite;
      }
      @keyframes flash {
        0%, 90% { opacity: 0; }
        95%, 100% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    const container = document.createElement("div");
    container.className = "fixed inset-0 overflow-hidden pointer-events-none";
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement("div");
      drop.className = "rain-drop";
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(drop);
    }
    const lightning = document.createElement("div");
    lightning.className = "lightning";
    container.appendChild(lightning);
    document.body.appendChild(container);
    return () => {
      document.head.removeChild(style);
      document.body.removeChild(container);
    };
  }, []);
  return null;
}
