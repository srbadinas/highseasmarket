import { PropsWithChildren } from "react"

interface ContainerProps extends PropsWithChildren {
  className?: string,
}

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={(className ? className : "") + " w-[90%] mx-auto px-3 xl:max-w-[1140px] 2xl:max-w-[1320px]"}>
      {children}
    </div>
  )
}

export default Container