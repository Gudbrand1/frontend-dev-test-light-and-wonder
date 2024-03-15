import { Text } from "@pixi/react";
function TitleCard({ title, x, y }) {
  return (
    <Text
      text={title}
      x={x}
      y={y}
      anchor={0}
      style={{
        align: "center",
        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
        fontSize: 60,
        fontWeight: "600",
        fill: ["#ffb2b2", "#b20000", "#660000"],
        stroke: "#ff0000",
        strokeThickness: 2,
        letterSpacing: 3,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 6,
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: 440,
      }}></Text>
  );
}

export default TitleCard;
