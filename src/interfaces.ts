interface New {
  id: string;
  date: string;
  publisher: string;
  title: string;
  description: string;
  sentiment: "neutral" | "positive" | "negative" | undefined;
  link: string;
  relatedSymbols: Ticker[];
}

interface Ticker {
  id: string;
  name: string;
  symbol: string;
}

export { New, Ticker };
