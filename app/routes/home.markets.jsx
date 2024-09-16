import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import marketsCssRef from "../styles/markets.css?url";
import MarketTable from "../components/marketTable";
export const links = () => [{ rel: "stylesheet", href: marketsCssRef }];

export async function loader() {
  return defer({
    data: fetch("https://markets.stellarx.com/api/v2/markets/").then((res) =>
      res.json()
    ),
  });
}

export default function Markets() {
  let { data } = useLoaderData();

  return (
    <div>
      <div className="markets">
        <div className="markets_data">
          <div className="filter_tools">
            <div className="filter_tools_left filter_fonts">
              <div tabIndex="0">
                <p>Top volume</p>
              </div>
              <div tabIndex="0">
                <p>USD</p>
              </div>
              <div tabIndex="1">
                <p>EUR</p>
              </div>
              <div tabIndex="2">
                <p>XLM</p>
              </div>
              <div tabIndex="3">
                <p>BTC</p>
              </div>
              <div tabIndex="4">
                <p>ETH</p>
              </div>
              <div tabIndex="5">
                <p>AQUA</p>
              </div>
            </div>
            <div className="filter_tools_right filter_fonts">
              <div tabIndex="0">
                <p>Starred</p>
              </div>
              <div tabIndex="1">
                <p>Search</p>
              </div>
            </div>
          </div>
          <Suspense fallback={<Loading />}>
            <Await resolve={data}>
              {(resolvedData) => {
                return (
                  <div className="market_table">
                    <MarketTable data={resolvedData.results} />
                  </div>
                );
              }}
            </Await>
          </Suspense>
        </div>
        <div className="gainers_losers"></div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
