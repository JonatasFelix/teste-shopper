import GlobalProvider from "./provider/GlobalProvider";
import GlobalStyle from "./assets/styles/GlobalStyles";
import { ToastContainer } from 'react-toastify';
import Router from "./routes/Router";
import 'react-toastify/dist/ReactToastify.css';
import SaveName from "./components/SaveName/SaveName";

function App() {
  return (
    <div>
      <GlobalProvider>
        <SaveName />
        <ToastContainer position="bottom-right" limit={3} autoClose={2000}/>
        <GlobalStyle />
        <Router />
      </GlobalProvider>
    </div>
  );
}

export default App;
