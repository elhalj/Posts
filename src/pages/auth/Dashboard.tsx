import Card from "./components/Card"
import donnee from "../../api/api.json"

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center">
      {/* <h1>Dashboard</h1> */}
      <Card data={donnee} />
    </div>
  )
}

export default Dashboard

