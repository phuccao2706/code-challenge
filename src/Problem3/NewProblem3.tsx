interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface Props extends BoxProps {}

const blockchainPriority: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// Mock
const useWalletBalances = (): WalletBalance[] => {
  return [];
};

// Mock
const usePrices = (): Record<string, number> => {
  return {};
};

const getPriority = (blockchain: string): number => {
  return blockchainPriority[blockchain] ?? -99;
};

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance) => balance.amount > 0 && getPriority(balance.blockchain) > -99
      )
      .sort(
        (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);

  const rows = sortedBalances.map((balance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed(2)}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
