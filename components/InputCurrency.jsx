import CurrencyFormat from "react-currency-format";

const InputCurrency = ({
    name = "",
    value = "",
    className = "",
    placeholder = "0.00",
    prefix = "$",
    thousandSeparator = true,
    required = false,
    processing = false,
    handleChange,
    rest
}) => {
    const onHandleFocus = (e) => {
        if (e.target.value === "$0") {
            e.target.value = "";
        }
    };

    const onHandleBlur = (e) => {
        if (!e.target.value) {
            e.target.value = "$0";
        }
    };

    return (
        <CurrencyFormat
            name={name}
            value={value}
            className={"w-full border border-gray-300 text-sm rounded shadow transition px-3 py-2 focus:border-blue-300 focus:ring-blue-300 focus-visible:outline-none " + className}
            placeholder={placeholder}
            prefix={prefix}
            thousandSeparator={thousandSeparator}
            required={required}
            disabled={processing}
            onChange={(e) => handleChange(e)}
            onFocus={(e) => onHandleFocus(e)}
            onBlur={(e) => onHandleBlur(e)}
            {...rest}
        />
    )
}

export default InputCurrency