import moment from "moment";

function LabelDateTime({ format = "MM/DD/YYYY LT", datetime }) {
  return (
    <>{(datetime ? moment(datetime).format(format) : '-')}</>
  )
}

export default LabelDateTime