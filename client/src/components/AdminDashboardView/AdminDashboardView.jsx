import React, { useContext } from "react";
import { Button } from "@material-ui/core";

export default function ShoppingSummary() {
  return (
    <div>
      Admin View
      <Button href="/user">Go To User View</Button>
    </div>
  );
}
