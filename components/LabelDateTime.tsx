import moment from "moment";

interface LabelDateTimeProps {
  format?: string,
  value: string | Date,
}

function LabelDateTime({ format = "MM/DD/YYYY LT", value }: LabelDateTimeProps) {
  return (
    <>{(value ? moment(value).format(format) : '-')}</>
  )
}

export default LabelDateTime