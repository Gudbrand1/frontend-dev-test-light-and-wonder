import React from "react";
import { Container, Graphics } from "@pixi/react";
import Circle from "./Circle";

function Grid({ x, y, onIndexClick, selectedBet }) {
  const rows = 15;
  const columns = 5;
  const circleSize = 40;
  const gap = 2;
  const gridWidth = columns * (circleSize + gap);
  const gridHeight = rows * (circleSize + gap);

  const yellow = 0xbb8c17;
  const red = 0xdd1919;
  const blue = 0x315393;
  const purple = 0x800080;
  const green = 0x46a82b;

  function selectColor(index) {
    if (index >= 4) {
      return green;
    } else if (index >= 3) {
      return purple;
    } else if (index >= 2) {
      return blue;
    } else if (index >= 1) {
      return red;
    } else {
      return yellow;
    }
  }
  const borderWidth = 5;
  const borderColor = 0x990000;
  return (
    <Container width={gridWidth} height={gridHeight} x={x} y={y}>
      <Graphics
        draw={(g) => {
          g.lineStyle(borderWidth, borderColor);
          g.drawRect(0, 0, gridWidth, gridHeight);

          g.lineStyle(0);
          g.beginFill(0x7f0000);
          g.drawRect(
            borderWidth / 2,
            borderWidth / 2,
            gridWidth - borderWidth,
            gridHeight - borderWidth
          );
          g.endFill();
        }}>
        {[...Array(rows)].map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {[...Array(columns)].map((_, colIndex) => (
              <Circle
                key={rowIndex + 1 + colIndex * rows}
                index={rowIndex + 1 + colIndex * rows}
                x={colIndex * (circleSize + gap) + circleSize / 2}
                y={rowIndex * (circleSize + gap) + circleSize / 2}
                color={
                  selectedBet === rowIndex + 1 + colIndex * rows
                    ? 0xaec3b0
                    : selectColor(colIndex)
                }
                onClick={() => onIndexClick(rowIndex + 1 + colIndex * rows)}
              />
            ))}
          </React.Fragment>
        ))}
      </Graphics>
    </Container>
  );
}

export default Grid;
