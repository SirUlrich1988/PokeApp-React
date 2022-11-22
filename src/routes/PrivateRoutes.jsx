import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
  const name = useSelector(state => state.name)

  return (name ? <Outlet /> : <Navigate to='/' />)
}

export default PrivateRoutes
