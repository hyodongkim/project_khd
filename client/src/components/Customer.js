import React from "react";
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";

export default function Customer(props) {
  return (
    <div>
      {props.id}
      {props.name}
      {props.birthday}
      {props.gender}
      {props.job}
    </div>
  );
}
