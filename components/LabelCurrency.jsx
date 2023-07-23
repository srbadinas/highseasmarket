import CurrencyFormat from "react-currency-format";

const LabelCurrency = ({ prefix = "$", children }) => {
    return (
        <CurrencyFormat
            value={children}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={prefix}
            renderText={(value) => <span>{value}</span>}
        />
    )
}

export default LabelCurrency