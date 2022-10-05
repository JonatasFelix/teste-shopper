import GlobalProvider from "./provider/GlobalProvider";
import GlobalStyle from "./assets/styles/GlobalStyles";
import Router from "./routes/Router";

function App() {
  return (
    <div>
      <GlobalProvider>
        <GlobalStyle />
        <Router />
      </GlobalProvider>
    </div>
  );
}

export default App;
