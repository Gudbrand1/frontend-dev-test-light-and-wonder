import { useState, useCallback, useEffect } from "react";
import { Stage, Container, Text, Graphics } from "@pixi/react";
import Confetti from "react-confetti";
import Balls from "./components/Balls";
import Grid from "./components/Grid";
import BettingAmount from "./components/BettingAmount";

import "@pixi/events";

import ballDrawConfig from "./config/balldraw_config.json";
import TitleCard from "./components/TitleCard";
import sequence from "./assets/sequence2.json";

function App() {
  const ballsWidth = 150;
  const ballsHeight = 150;
  const [height, setHeight] = useState(window.innerHeight - 10); // removed 10px to avoid issues with chrome
  const [width, setWidth] = useState(window.innerWidth);
  const [ballsW, setBallsW] = useState(width / 2 - ballsWidth / 2);
  const [ballsH, setBallsH] = useState(height / 2 - ballsHeight / 2);
  const [selectedBet, setSelectedBet] = useState(-1);
  const [errorMessage, setErrorMessage] = useState("");

  const [finalX, setFinalX] = useState(0);
  const [winnerText, setWinnerText] = useState("");
  const [index, setIndex] = useState(0);
  const [currentBallValue, setCurrentBallValue] = useState(0);
  const [keepSpinning, setKeepSpinning] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;

      setHeight(innerHeight - 10); // removed 10px to avoid issues with chrome
      setWidth(innerWidth);
      setBallsW(innerWidth / 2 - ballsWidth / 2);
      setBallsH(innerHeight / 2 - ballsHeight / 2);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function fetchNextBall() {
    if (keepSpinning === false) return; // handle the button spam click
    if (selectedBet === 0) {
      setErrorMessage("Select a ball");
      return;
    }
    setKeepSpinning(false);
    const ballValue = sequence.balls[index];
    if (ballValue >= 60) {
      setFinalX(150); // green
    } else if (ballValue >= 46) {
      setFinalX(300); // purple
    } else if (ballValue >= 31) {
      setFinalX(450); // blue
    } else if (ballValue >= 16) {
      setFinalX(600); // red
    } else {
      setFinalX(0); // yellow
    }
    setWinnerText(getWinner(index));
    setCurrentBallValue(ballValue);
    setTimeout(() => {
      setKeepSpinning(true);
    }, ballDrawConfig.timeout);
    if (index < 0 || index >= sequence.nballs) return setIndex(0);
    setIndex(index + 1);
  }

  function getWinner(index) {
    if (index < 0 || index >= sequence.nballs) {
      return "";
    } // Normally never triggered as fetchNextBall handle it

    const winners = sequence.winners.split(",");
    const winner = winners[index];
    if (winner === "") {
      return winner;
    } else {
      return formatWinner(winner);
    }
  }
  const draw = useCallback((g) => {
    g.clear();
    g.beginFill(0xffffff);
    g.drawRect(0, 150, 150, 50);
    g.endFill();
  }, []);

  function formatWinner(winnerString) {
    const winnerStringSplit = winnerString.split(":");

    return `${winnerStringSplit[2]} won ${winnerStringSplit[8]} ${
      winnerStringSplit[7]
    } while betting ${winnerStringSplit[5]} on ${getGameName(
      winnerStringSplit[1]
    )}`;
  }

  function getGameName() {
    return "Ball Roulette";
  }

  const handleIndexClick = (index) => {
    setErrorMessage(""); // Since currently it's only asking for a ball Selection
    setSelectedBet(index);
  };

  return (
    <div>
      {selectedBet === currentBallValue && !keepSpinning ? (
        <Confetti width={width} height={height} />
      ) : (
        <span></span>
      )}

      <Stage
        width={width}
        height={height}
        options={{ backgroundColor: 0x35654d }}>
        <Grid
          x={width > 1000 ? 50 : (width - ballsWidth * 5) / 2}
          y={height / 2 - 250}
          onIndexClick={handleIndexClick}
          selectedBet={selectedBet}
        />
        <Container position={[ballsW, ballsH]}>
          <TitleCard title={getGameName(0)} x={-130} y={-100} />
          <Balls
            finalX={finalX}
            currentBallValue={currentBallValue}
            keepSpinning={keepSpinning}
          />
          {keepSpinning === true ? (
            <Text text={errorMessage} y={50} x={3} />
          ) : (
            <Text // Potential amelioration would be to match the current ball speed to get the effect that the number is on the ball
              text={currentBallValue}
              anchor={0}
              x={currentBallValue >= 10 ? 60 : 66}
              y={50}
              style={{
                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                fill: "#000000", // Could set the color to the ball color
              }}
            />
          )}
          {keepSpinning === true ? (
            <Text text={""} />
          ) : (
            <Text
              text={winnerText}
              x={-130}
              y={ballsHeight + 120}
              style={{
                align: "center",
                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                fontSize: 20,
                fontWeight: "600",
                fill: ["#ffb2b2", "#b20000", "#660000"],
                stroke: "#000000",
                strokeThickness: 2,
                letterSpacing: 3,
                dropShadow: true,
                dropShadowColor: "#660000",
                dropShadowBlur: 6,
                dropShadowAngle: Math.PI / 2,
                dropShadowDistance: 2,
                wordWrap: true,
                wordWrapWidth: 440,
              }}
            />
          )}
          <Container>
            <BettingAmount posX={(width - ballsWidth * 3) / 2} />
            <Graphics
              // x={780}
              // y={0}
              anchor={0}
              draw={draw}
              interactive={true}
              pointerdown={fetchNextBall}>
              <Text text={"Bet"} x={55} y={156}></Text>
            </Graphics>
          </Container>
        </Container>
      </Stage>
    </div>
  );
}

export default App;
