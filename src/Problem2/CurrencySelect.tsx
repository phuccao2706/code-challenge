import { Select, SelectProps } from "antd";
import { IPrices } from "./interface";

const { Option } = Select;
const CurrencySelect = ({
  prices,
  ...props
}: SelectProps & { prices: IPrices }) => {
  return (
    <Select {...props}>
      {Object.keys(prices).map((currency) => (
        <Option key={currency} value={currency}>
          {currency}
        </Option>
      ))}
    </Select>
  );
};

export default CurrencySelect;
