import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { utils } from "ethers";
import { NetworkSelector } from "./NetworkSelector";
import { Spinner } from "./Spinner";

const fetchTransactions = ({ network }) => {
  return fetch(`http://localhost:3042/transactions?network=${network}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => json.result.transactions);
};

export const Transactions = ({ network }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTransactions({ network }).then((newTxns) => {
      setLoading(false);
      setTransactions(newTxns);
    });
  }, [network]);

  return (
    <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Latest transactions</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Transaction Hash
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">From</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">To</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Amount</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {loading ? <Spinner /> : null}
                  {transactions.map((txn) => (
                    <tr key={txn.hash}>
                      <td className="p-2 whitespace-nowrap">
                        <Link to={`/transaction/${txn.hash}`}>
                          <div className="flex items-center">
                            <div className="font-medium text-blue-500 underline truncate w-32">
                                {txn.hash}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left truncate w-32">{txn.from}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left truncate w-32">{txn.to}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                          {utils.formatEther(txn.value)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
