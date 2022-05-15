import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { utils } from "ethers";

const fetchBlock = ({ network, blockId }) => {
  console.log("fetchBlock!");
  return fetch(
    `http://localhost:3042/block?network=${network}&blockId=${blockId}`,
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

export const Block = ({ network }) => {
  const { id } = useParams();
  const [block, setBlock] = useState({});

  useEffect(() => {
    fetchBlock({ network, blockId: id }).then((newBlock) => setBlock(newBlock));
  }, [network, id]);

  if (!block) return null;

  console.log(block);

  return (
    <div>
      <h3>Block #{block.number}</h3>
      <ul>
        <li>Block height: {block.number}</li>
        <li>
          Timestamp:{" "}
          {new Date(block.timestamp * 1000).toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
          })}
        </li>
        <li>Transactions: {block.transactions && block.transactions.length} txns in this block</li>
        <li>Mined by: {block.miner}</li>
        <li>Block Reward: {block.baseFeePerGas && utils.formatEther(block.baseFeePerGas)} ETH</li>
        <li>Difficult: {block.difficulty}</li>
        <li>Gas Used: {block.gasUsed && utils.formatEther(block.gasUsed)} ETH</li>
        <li>Gas Limit: {block.gasLimit && utils.formatEther(block.gasLimit)} ETH</li>
        <li>Base Fee per Gas: {block.baseFeePerGas && utils.formatEther(block.baseFeePerGas)} ETH</li>
        <li>Extra Data: {block.extraData}</li>
        <li>Parent Hash: {block.parentHash}</li>
      </ul>
    </div>
  );
};
