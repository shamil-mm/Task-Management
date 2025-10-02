import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { logoutUser } from '../services/authService';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleLogout = async() => {
    try {
       await logoutUser()
    } catch (error) {
      console.error("Logout API failed:", error);
    }finally{
      dispatch(logout())
      navigate('/login');
    }
   
  };

  return (
    <div className="w-64 bg-green-950 text-white h-screen flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Task Manager</h2>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-black transition flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </button>

          {/* <button 
            onClick={() => navigate('/tasks')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            My Tasks
          </button> */}

          {/* <button 
            onClick={() => navigate('/profile')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </button> */}
        </div>
      </nav>

      <div className="p-4 border-t border-white">
        <button 
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-black transition flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;