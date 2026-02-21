import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "jalaali-react-date-picker/lib/styles/index.css";
import Sidebar from './components/sidebar';
import Login from './components/login';
import "./index.css"
import "./App.css"
import MissionRequestPage from './components/mission-request/MissionRequestPage';
import { SidebarProvider } from './contexts/SidebarContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("token") != null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          {!isLoggedIn ? <Redirect to="/login" /> : null}
          <SidebarProvider>
            <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <Sidebar />
              
              {/* Main Content - با انیمیشن برای تغییر سایز */}
              <main 
                className="h-screen overflow-y-auto transition-all duration-500 ease-in-out w-full"
                style={{ 
                  marginRight: 'var(--sidebar-width)',
                  width: 'calc(100% - var(--sidebar-width))',
                }}
              >
                <div className=" pt-10 md:pt-0 w-full" dir="rtl">
                  <Switch>
                    <Route path="/mission-request">
                      <MissionRequestPage />
                    </Route>
                    {/* مسیرهای دیگر */}
                  </Switch>
                </div>
              </main>
            </div>
          </SidebarProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;