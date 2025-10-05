import { useLoaderData } from 'react-router'
import { getDashboard } from '../utils/apiCalls'

export { getDashboard as loader }

export default function Dashboard() {
  const data = useLoaderData()
  return (
    <>
      <h1>Dashboard</h1>
      <p>{data.message}</p>
    </>
  )
}
