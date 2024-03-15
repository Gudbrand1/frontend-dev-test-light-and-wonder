import balls from "../assets/balls.png";
import ballDrawConfig from "../config/balldraw_config.json";
import { TilingSprite, useTick } from "@pixi/react";
import { useState } from "react";

function Balls(props) {
  const [x, setX] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(ballDrawConfig.maxSpeed);

  useTick((delta) => {
    if (props.keepSpinning) {
      setCurrentSpeed(ballDrawConfig.displaySpeed);
      setX((prevX) => {
        return prevX + ballDrawConfig.speed * currentSpeed * delta;
      });
    } else if (currentSpeed > 0) {
      setX((prevX) => {
        const newX = prevX + ballDrawConfig.speed * currentSpeed * delta;
        const direction = Math.sign(props.finalX - prevX);
        if (
          (direction === -1 && newX >= props.finalX) ||
          (direction === 1 && newX <= props.finalX)
        ) {
          return props.finalX;
        }
        return newX;
      });
      setCurrentSpeed(currentSpeed - 1);
    }
  });

  return (
    <TilingSprite
      image={balls}
      width={150}
      height={150}
      tilePosition={{ x: x, y: 0 }}
      tileScale={{ x: 1, y: 1 }}
      alpha={ballDrawConfig.alpha}
    />
  );
}

export default Balls;
