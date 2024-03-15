import { Text, Graphics } from "@pixi/react";
import { useState } from "react";
function BettingAmount({ posX }) {
  const y = 25;
  const rectSize = 150;
  const circleDiam = 20;
  const split = 25;
  const [selectedBet, setSelectedBet] = useState(0);
  const balance = 2.0;
  return (
    <Graphics
      anchor={0}
      x={posX}
      y={0}
      draw={(g) => {
        g.lineStyle(200, 0x7f0000);
        g.drawRect(0, 0, rectSize, 50);

        g.lineStyle(1, 0x000000);
        g.beginFill(0xdd1919);
        g.drawRect(0, 0, rectSize, 50);
      }}>
      <Graphics
        draw={(g) => {
          g.beginFill(0xdd1919);
          g.drawCircle(0, 0, circleDiam);
          g.endFill();
        }}
        x={-split}
        y={y}
        buttonMode={true}
        interactive={true}
        pointerdown={() => {
          if (selectedBet >= 1) return setSelectedBet(selectedBet - 1);
          // possible amelioration would be to offer a "trial run" if they are not betting
        }}>
        <Text text={"-"} x={-5} y={-20}></Text>
      </Graphics>
      <Graphics
        draw={(g) => {
          g.beginFill(0xdd1919);
          g.drawCircle(0, 0, circleDiam);
          g.endFill();
        }}
        x={rectSize + split}
        y={y}
        buttonMode={true}
        interactive={true}
        pointerdown={() => {
          if (selectedBet < balance) return setSelectedBet(selectedBet + 1);
          // possible amelioration would be to prompt the user to increase their balance if they want to add more onto the bet
        }}>
        <Text text={"+"} x={-8} y={-18}></Text>
      </Graphics>
      <Text text={`Balance : ${balance} EUR`} x={-15} y={-60}></Text>
      <Text text={"Bet :"} x={0} y={8}></Text>
      <Text text={`${selectedBet} EUR`} x={60} y={8}></Text>
    </Graphics>
  );
}
export default BettingAmount;
