import GlobalProvider from "./provider/GlobalProvider";
import GlobalStyle from "./assets/styles/GlobalStyles";
import Router from "./routes/Router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <GlobalProvider>
        <ToastContainer position="bottom-right" limit={3} autoClose={2000}/>
        <GlobalStyle />
        <Router />
      </GlobalProvider>
    </div>
  );
}

export default App;
