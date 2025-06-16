import Card from "./components/Card"
import donnee from "../../services/api/api.json"

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center bg-gray-100 p-4 rounded-lg shadow-lg">
      {/* <h1 className="text-3xl font-bold mb-4">Dashboard</h1> */}
      <Card data={donnee} />
    </div>
  )
}

export default Dashboard

