import React from "react";

import * as Icons from "./Icons";

export default () => (
  <ul>
    <li>
      <Icons.Useful />
      <div className="text-secondary">{Icons.description.useful}</div>
    </li>
    <li>
      <Icons.Rumor />
      <div className="text-secondary">{Icons.description.rumor}</div>
    </li>
    <li>
      <Icons.NotVerified />
      <div className="text-secondary">{Icons.description.notVerified}</div>
    </li>
    <style jsx>{`
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0 0 5px;
        display: flex;
      }
      li {
        display: flex;
        align-items: center;
        margin: 0 10px;
      }
      div {
        font-size: 14px;
        margin-left: 5px;
      }
    `}</style>
  </ul>
);
