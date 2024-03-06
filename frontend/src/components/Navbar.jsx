import { useContext } from "react"
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function Navbar() {

  const { logout, isLogin } = useContext(AuthContext);

  return (
    <nav>
      <a href="/">Mern Todo App</a>

      { isLogin && <Link to="/" onClick={logout}>Выйти</Link> }
      
    </nav>
  )
}
