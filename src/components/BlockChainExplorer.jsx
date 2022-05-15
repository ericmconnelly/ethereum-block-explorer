import React, { Fragment } from "react";
import { Header } from "./Header";
import { Blocks } from "./Blocks";
import { Transactions } from "./Transactions";

export const BlockChainExplorer = ({ network }) => {
  return (
    <>
      <Blocks network={network} />
    </>
  );
};
