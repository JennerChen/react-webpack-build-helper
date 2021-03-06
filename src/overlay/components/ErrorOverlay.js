/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from "react";
import { black } from "../styles";

const overlayStyle = {
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  height: "100%",
  width: "1024px",
  maxWidth: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  padding: "0.5rem",
  boxSizing: "border-box",
  textAlign: "left",
  fontFamily: "Consolas, Menlo, monospace",
  fontSize: "11px",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: 1.5,
  color: black
};

class ErrorOverlay extends Component {
  render() {
    return <div style={overlayStyle}>{this.props.children}</div>;
  }
}

export default ErrorOverlay;
