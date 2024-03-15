import React from "react";
import { Graphics, Text } from "@pixi/react";

function Circle({ index, x, y, color, onClick }) {
  return (
    <Graphics
      draw={(g) => {
        g.beginFill(color);
        g.drawCircle(0, 0, 16);
        g.endFill();
      }}
      x={x}
      y={y}
      buttonMode={true}
      interactive={true}
      pointerdown={() => {
        onClick(index);
      }}>
      <Text
        text={`${index}`}
        style={{
          fill: "white",
          fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
          fontSize: 16,
          align: "center",
          dropShadow: true,
          dropShadowColor: "#000000",
          dropShadowBlur: 6,
          dropShadowAngle: Math.PI / 2,
          dropShadowDistance: 2,
        }}
        x={index > 9 ? -10 : -5}
        y={-13}
      />
    </Graphics>
  );
}

export default Circle;
