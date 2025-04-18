import React from "react";
import { Mafs, Coordinates, Plot } from "mafs";
import "mafs/core.css";

export function MafsHello() {
  return (
    <Mafs>
      <Coordinates.Cartesian subdivisions={4} />
      <Plot.OfY x={(x) => Math.sin(x)} color="#1976d2" />
    </Mafs>
  )
}
