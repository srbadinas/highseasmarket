import { HTMLProps } from "react"

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: "submit" | "reset" | "button"
  processing?: boolean
}

const Button = ({ type, className = "", processing = false, disabled, children, ...rest }: ButtonProps) => {
  return (
    <button
      type={type}
      className={"btn btn-default " + className + (processing ? " brightness-50 hover:!brightness-50 focus:!ring-0" : "")}
      disabled={disabled || processing ? true : false}
      {...rest}
    >
      {processing ? "..." : children}
    </button>
  )
}

export default Button