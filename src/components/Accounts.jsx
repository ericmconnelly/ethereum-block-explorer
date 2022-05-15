import React, { useEffect, useState } from "react";

const fetchAccounts = ({network}) => {
  return fetch(`http://localhost:3042/accounts?network=${network}`, {
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

export const Accounts = ({network}) => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccount, setFilteredAccount] = useState([]);

  useEffect(() => {
    fetchAccounts({network: network.toLowerCase()}).then((newAccounts) => {
      setAccounts(newAccounts);
      setFilteredAccount(newAccounts);
    });
  }, [network]);

  console.log(accounts);

  const handleSearchAccount = (e) => {
    const value = e.target.value;

    if (value.length === 0) {
      setFilteredAccount(accounts);
    } else {
      setFilteredAccount(() =>
        accounts.filter((acc) => acc.address.includes(value))
      );
    }
  };

  return null;

  return (
    <>
      <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Latest blocks</h2>
            </header>
            <div className="p-3">
              <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
                onChange={handleSearchAccount}
              />
            </div>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full overflow-auto">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Account address
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Amount</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="text-sm divide-y divide-gray-100 overflow-auto overflow-y-scroll w-full"
                    style={{ maxHeight: "50vh" }}
                  >
                    {filteredAccount.slice(0,10).map((acc) => (
                      <tr key={acc.address}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-800">
                              {acc.address}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{acc.ethAmount}</div>
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
    </>
  );
};
