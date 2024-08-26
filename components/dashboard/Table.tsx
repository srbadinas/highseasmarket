import Alert from "@/components/Alert"
import Loader from "@/components/Loader"
import { HTMLProps, PropsWithChildren } from "react"

interface TableProps extends PropsWithChildren<HTMLProps<HTMLTableElement>> {

}

export const Table = ({ className = "", children }: TableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={"dashboard-table " + className}>
        {children}
      </table>
    </div>
  )
}

interface TableHeadProps extends PropsWithChildren {

}

export const TableHead = ({ children }: TableHeadProps) => {
  return <thead>
    {children}
  </thead>
}

interface TableBodyProps extends PropsWithChildren {
  loading: boolean,
  errorMessage?: string,
}

export const TableBody = ({ loading, errorMessage, children }: TableBodyProps) => {
  return (
    <tbody>
      {
        loading ?
          <tr>
            <td className="!text-center" colSpan={100}><Loader /></td>
          </tr> :
          errorMessage ?
            <tr>
              <td className="!text-center" colSpan={100}><Alert className="!mb-0" type="error" message={errorMessage} /></td>
            </tr> :
            children ?
              children : <tr>
                <td className="!text-center" colSpan={100}>
                  No results found.
                </td>
              </tr>
      }
    </tbody>
  )
}
