import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NetworkSelector } from "./NetworkSelector";
import { Spinner } from "./Spinner";

const fetchBlocks = ({network}) => {
  return fetch(`http://localhost:3042/blocks?network=${network}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => json.result);
};

export const Blocks = ({network}) => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBlocks({network}).then((newBlocks) => {
      setLoading(false);
      setBlocks(newBlocks);
    });
  }, [network]);

  return (
    <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Latest blocks</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Block number
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Txn Number</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Timestamp</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {loading ? <Spinner/> : null}
                  {blocks.map((block) => (
                    <tr key={block.number}>
                      <td className="p-2 whitespace-nowrap">
                        <Link to={`/block/${block.number}`}>
                          <div className="flex items-center">
                            <div className="font-medium text-blue-500 underline truncate w-32">
                              {block.number}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                          {block.transactions.length}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">
                          {new Date(block.timestamp * 1000).toLocaleString(
                            "en-US",
                            {
                              timeZone: "America/Los_Angeles",
                            }
                          )}
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
