import React from "react";

export const Stats = () => {
  const statsUrl = process.env?.STATS_URL;
  const statsId = process.env?.STATS_ID;

  return (
    (statsUrl && statsId) ? (
      <>
        <script async src={statsUrl} data-website-id={statsId}></script>
      </>
    ) : <></>
  );
};