class WordleClient {
  async signWord(wordHash: string, letterCodes: string, salt: string) {
    return "";
  }

  async startGame(
    wordHash: string,
    letterCodes: string,
    salt: string,
    signature: string
  ) {
    return true;
  }

  async makeGuess(word: string) {
    return true;
  }
}
