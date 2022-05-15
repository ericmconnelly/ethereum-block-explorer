import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { utils } from "ethers";

const fetchTransaction = ({ network, transactionHash }) => {
  return fetch(
    `http://localhost:3042/transaction?network=${network}&transactionHash=${transactionHash}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((json) => json.result);
};

export const Transaction = ({ network }) => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    fetchTransaction({ network: network.toLowerCase(), transactionHash: id }).then((newTransaction) => setTransaction(newTransaction));
  }, [network, id]);
  
  console.log('transaction ', transaction)
  if (!transaction) return null;

  return (
    <div>
      <h3>Transaction Hash #{transaction.hash}</h3>
      <ul>
        <li>Block Number: {transaction.blockNumber}</li>
        <li>From: {transaction.from}</li>
        <li>To: {transaction.to}</li>
        <li>Value: {transaction.value && utils.formatEther(transaction.value)} ETH</li>
        <li>Transaction Fee: {transaction.difficulty}</li>
        <li>Gas Price: {transaction.gasPrice && utils.formatEther(transaction.gasPrice)} ETH</li>
        <li>Gas Limit: {transaction.gasLimit && utils.formatEther(transaction.gasLimit)} ETH</li>
        <li>Nonce: {transaction.nonce}</li>
        {/* <li>Gas Used: {block.gasUsed && utils.formatEther(block.gasUsed)}</li>
        <li>Gas Limit: {block.gasLimit && utils.formatEther(block.gasLimit)}</li>
        <li>Base Fee per Gas: {block.baseFeePerGas && utils.formatEther(block.baseFeePerGas)}</li>
        <li>Extra Data: {block.extraData}</li>
        <li>Parent Hash: {block.parentHash}</li> */}
      </ul>
    </div>
  );
};
