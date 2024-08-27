import React from "react";
import { Projection } from "../util/useProjections";

const ProjectionsTable: React.FC<{ projections: Projection[] }> = ({
  projections,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Price</th>
          <th>Contribution</th>
          <th>Total Contributions</th>
          <th>Asset Order</th>
          <th>Asset Total</th>
          <th>Asset Balance</th>
          <th>Settlement</th>
          <th>Total Balance</th>
        </tr>
      </thead>
      <tbody>
        {projections.map((projection, index) => (
          <tr key={index}>
            <td>{projection.date.toLocaleDateString()}</td>
            <td>${projection.price.toFixed(2)}</td>
            <td>${projection.contribution.toFixed(2)}</td>
            <td>${projection.totalContributions.toFixed(2)}</td>
            <td>{projection.assetOrder.toFixed(6)}</td>
            <td>{projection.assetTotal.toFixed(6)}</td>
            <td>${projection.assetBalance.toFixed(2)}</td>
            <td>${projection.settlement.toFixed(2)}</td>
            <td>${projection.totalBalance.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectionsTable;
