import { IntroductionContainer, IntroductionItem } from "./styles";

const Instruction = () => {
  return (
    <IntroductionContainer>
      <IntroductionItem>
        The game uses a poker deck with 4 suits: Hearts, Diamonds, Clubs, and
        Spades.
      </IntroductionItem>
      <IntroductionItem>
        The player bets on one suit before the game starts.
      </IntroductionItem>
      <IntroductionItem>
        The dealer then reveals cards one by one, advancing the corresponding
        suit by one step.
      </IntroductionItem>
      <IntroductionItem>
        The game continues until one suit reaches 5 steps, and that suit is
        declared the winner.
      </IntroductionItem>
    </IntroductionContainer>
  );
};

export default Instruction;
