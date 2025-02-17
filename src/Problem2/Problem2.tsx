import { SyncOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Form,
  Image,
  InputNumber,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import { IPriceData, IPrices } from "./interface";

const { Title, Text } = Typography;

const getExchangeRate = ({
  fromCurrency,
  toCurrency,
  prices,
  forDisplay,
}: {
  fromCurrency: string;
  toCurrency: string;
  prices: IPrices;
  forDisplay: boolean;
}): number | string => {
  if (prices[fromCurrency] && prices[toCurrency]) {
    const rate = prices[fromCurrency] / prices[toCurrency];
    if (forDisplay) {
      return rate.toFixed(6);
    }
    return rate;
  }

  return 1;
};

const getConvertedAmount = ({
  amount,
  fromCurrency,
  toCurrency,
  prices,
}: {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  prices: IPrices;
}): string => {
  if (prices[fromCurrency] && prices[toCurrency]) {
    const converted =
      amount *
      (getExchangeRate({
        forDisplay: false,
        fromCurrency,
        toCurrency,
        prices,
      }) as number);
    return converted.toFixed(6);
  }

  return "";
};

const CurrencySwapForm: React.FC = () => {
  const [prices, setPrices] = useState<IPrices>({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETH");
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      .then((data: IPriceData[]) => {
        const latestPrices: Record<string, number> = {};
        data.forEach(({ currency, price }) => {
          latestPrices[currency] = price;
        });
        setPrices(latestPrices);
      })
      .catch((error) => console.error("Error fetching prices:", error));
  }, []);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "From currency",
      children: (
        <Text>
          <Image
            width={24}
            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${fromCurrency}.svg`}
            fallback="https://picsum.photos/24"
          />{" "}
          {fromCurrency}
        </Text>
      ),
    },
    {
      key: "2",
      label: "To currency",
      children: (
        <Text>
          <Image
            width={24}
            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${toCurrency}.svg`}
            fallback="https://picsum.photos/24"
          />{" "}
          {toCurrency}
        </Text>
      ),
    },
    {
      key: "5",
      label: "Amount",
      children: <Text>{amount}</Text>,
    },
    {
      key: "3",
      label: "Exchange Rate",
      children: getExchangeRate({
        forDisplay: true,
        fromCurrency,
        toCurrency,
        prices,
      }),
    },
    {
      key: "4",
      label: "You will receive",
      children: getConvertedAmount({
        amount,
        fromCurrency,
        toCurrency,
        prices,
      }),
    },
  ];

  return (
    <Card style={{ maxWidth: "65vw", margin: "auto", padding: 20 }}>
      <Title level={4}>Currency Swap</Title>
      <Form layout="vertical">
        <Form.Item label="From Currency">
          <CurrencySelect
            value={fromCurrency}
            prices={prices}
            onChange={setFromCurrency}
          />
        </Form.Item>

        <Form.Item label="To Currency">
          <CurrencySelect
            value={toCurrency}
            prices={prices}
            onChange={setToCurrency}
          />
        </Form.Item>

        <Form.Item label="Amount">
          <InputNumber
            min={0.01}
            value={amount}
            onChange={(value) => setAmount(value || 1)}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item>
          <Descriptions title="Result" items={items} />
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            onClick={handleSwap}
            style={{ marginRight: 10 }}
          >
            <SyncOutlined />
          </Button>
          <Button type="primary">Confirm Swap</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CurrencySwapForm;
