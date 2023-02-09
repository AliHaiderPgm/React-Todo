import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle"

import Routes from './pages/Routes'
import {AuthContextProvider} from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthContextProvider>
    </>
  );
}

export default App;
