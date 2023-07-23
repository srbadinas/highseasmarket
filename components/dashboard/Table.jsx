import Alert from "@components/Alert"
import Loader from "@components/Loader"

const Table = ({ className = "", children }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={"dashboard-table " + className}>
        {children}
      </table>
    </div>
  )
}

const Head = ({ children }) => {
  return <thead>
    {children}
  </thead>
}
const Body = ({ loading, error, children }) => {
  return (
    <tbody>
      {
        loading ?
          <tr>
            <td className="!text-center" colSpan="100%"><Loader /></td>
          </tr> :
          error ?
            <tr>
              <td className="!text-center" colSpan="100%"><Alert className="!mb-0" type="error" message={error} /></td>
            </tr> :
            children ?
              children : <tr>
                <td className="!text-center" colSpan="100%">
                  No results found.
                </td>
              </tr>
      }
    </tbody>
  )
}

Table.Head = Head;
Table.Body = Body;

export default Table