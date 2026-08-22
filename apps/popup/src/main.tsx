import "./styles/globals.css";

import { createRoot } from "react-dom/client";

import Main from "./components/main";
import Footer from "./components/sections/footer";
import Header from "./components/sections/header";
import Container from "./components/ui/container";

document.documentElement.classList.toggle(
  "dark",
  window.matchMedia("(prefers-color-scheme: dark)").matches,
);

function App() {
  return (
    <Container>
      <Header />
      <Main />
      <Footer />
    </Container>
  );
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("Popup root element not found");
}

createRoot(root).render(<App />);
