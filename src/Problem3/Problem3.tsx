//ts-ignal

interface WalletBalance {
    currency: string;
    amount: number;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  interface Props extends BoxProps {
  
  }

  const useWalletBalances = () => {}
  const usePrices = () => {}

  const Problem3: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
    //   NOTE: blockchain is typed as any
    const getPriority = (blockchain: any): number => {
      switch (blockchain) {
        case "Osmosis":
          return 100;
        case "Ethereum":
          return 50;
        case "Arbitrum":
          return 30;
        case "Zilliqa":
          return 20;
        case "Neo":
          return 20;
        default:
          return -99;
      }
    };
  
    const sortedBalances = useMemo(() => first, [second])(() => {
      return balances.filter((balance: WalletBalance) => {
        //NOTE: blockchain is not included in WalletBalance
            const balancePriority = getPriority(balance.blockchain);
            //NOTE: lhsPriority is undefined
            if (lhsPriority > -99) {
                //NOTE: redundant
               if (balance.amount <= 0) {
                 return true;
               }
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
              const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }
            //NOTE: returns undefined in case of equality
      });
    }, [balances, prices]);
    //NOTE: formattedBalances mapping is redundant and is calculated on every render
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          //NOTE: index as key
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }