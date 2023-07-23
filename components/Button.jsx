const Button = ({type = "submit", className = "", processing = false, children, ...rest}) => {
  return (
    <button type={type} className={"btn btn-default " + className + (processing ? " brightness-50 hover:!brightness-50 focus:!ring-0" : "")} {...rest}>{processing ? "..." : children}</button>
  )
}

export default Button