import React, {useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import { BlockChainExplorer } from "./components/BlockChainExplorer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Block } from "./components/Block";
import { Accounts } from "./components/Accounts";
import { Header } from "./components/Header";
import { Transactions } from "./components/Transactions";
import { Transaction } from "./components/Transaction"

function App() {
  const [network, setNetwork] = useState("Rinkeby");

  return (
    <div className="App">
      <BrowserRouter>
        <Header network={network} onSelect={setNetwork}/>
        <Routes>
          <Route path="/" element={<BlockChainExplorer network={network}/>} />
          <Route path="transactions" element={<Transactions network={network} />} />
          <Route path="accounts" element={<Accounts network={network}/>} />
          <Route path="block" element={<Block network={network}/>} />
          <Route path="block/:id" element={<Block network={network}/>} />
          <Route path="transaction/:id" element={<Transaction network={network}/>} />
          {/* <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
