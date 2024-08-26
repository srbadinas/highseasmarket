import { formatValue } from 'react-currency-input-field';

interface LabelCurrencyProps {
    prefix?: string,
    value: string | number
}

const LabelCurrency = ({ prefix = "$", value }: LabelCurrencyProps) => {

    const formattedValue = formatValue({
        value: value as string,
        groupSeparator: ',',
        decimalSeparator: '.',
        prefix: prefix,
    });

    return (
        <>{formattedValue}</>
    )
}

export default LabelCurrency