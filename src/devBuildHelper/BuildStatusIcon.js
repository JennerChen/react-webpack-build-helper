import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: all 0.3s;
  bottom: 50px;
  right: 10px;
  background-color: transparent;
  will-change: right;
`;

const ConfigPanel = styled.div`
  position: absolute;
  left: -5px;
  top: 10px;
  transform: translate(-100%, -50%);
  background-color: #efefef;
  border-radius: 5px;
  padding: 10px;
  width: 80px;
  font-size: 12px;
  box-shadow: 0px 2px 2px 0px rgba(128, 128, 128, 0.6);
`;

const ClickBg = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-align: center;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.clickIcon = this.clickIcon.bind(this);
    this.toggleConfigPanel = this.toggleConfigPanel.bind(this);
    this.state = Object.assign(
      {},
      {
        outDate: false,
        showConfig: false
      },
      this.props
    );
  }

  setConfig(key, value) {
    this.props.onChangeConfig(key, value);
    this.setState({
      [key]: value
    });
  }

  clickIcon() {
    const { status, showConfig, outDate } = this.state;
    if (outDate) {
      window.location.reload();
    } else {
      //      this.setState({
      //        showConfig: !showConfig
      //      })
    }
  }

  toggleConfigPanel() {
    this.setState({
      showConfig: !this.state.showConfig
    });
  }

  outDate() {
    this.setState({
      outDate: true
    });
  }

  status(statusType) {
    this.setState({
      status: statusType
    });
  }

  render() {
    const {
      status,
      outDate,
      showConfig,
      autoRefresh,
      showErrors,
      showWarnings,
      logErrors,
      logWarnings
    } = this.state;

    let bgColor = null,
      offsetRight = 10;
    switch (status) {
      case "error":
        bgColor = "red";
        offsetRight = 10;
        break;
      case "warning":
        bgColor = "orange";
        offsetRight = 10;
        break;
      default:
      case "success":
        bgColor = "#17803e";
        offsetRight = -15;
        break;
    }

    return (
      <Container
        style={{
          backgroundColor: bgColor,
          right: offsetRight
        }}
      >
        <svg
          viewBox={"0 0 24 24"}
          height={16}
          width={16}
          fill={"currentColor"}
          title={"设置"}
          onClick={this.toggleConfigPanel}
          style={{
            position: "absolute",
            top: -10,
            left: -8
          }}
        >
          <path
            d={
              "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
            }
          />
        </svg>
        <ClickBg onClick={this.clickIcon}>
          {outDate ? (
            <svg
              viewBox={"0 0 24 24"}
              height={"20"}
              width={"20"}
              fill={"currentColor"}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                fill: "#fff"
              }}
            >
              <title>Refresh icon</title>
              <path
                d={
                  "M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                }
              />
            </svg>
          ) : null}
        </ClickBg>

        {showConfig ? (
          <ConfigPanel>
            <div
              style={{ position: "absolute", top: 2, right: 2, color: "#333" }}
              onClick={this.toggleConfigPanel}
            >
              x
            </div>
            <div>
              <label style={{ marginRight: 5 }}>自动刷新</label>
              <input
                type={"checkbox"}
                checked={autoRefresh}
                onChange={() => this.setConfig("autoRefresh", !autoRefresh)}
              />
            </div>

            <div>
              <label style={{ marginRight: 5 }}>显示错误</label>
              <input
                type={"checkbox"}
                checked={showErrors}
                onChange={() => this.setConfig("showErrors", !showErrors)}
              />
            </div>

            <div>
              <label style={{ marginRight: 5 }}>显示警告</label>
              <input
                type={"checkbox"}
                checked={showWarnings}
                onChange={() => this.setConfig("showWarnings", !showWarnings)}
              />
            </div>

            <div>
              <label style={{ marginRight: 5 }}>记录错误</label>
              <input
                type={"checkbox"}
                checked={logErrors}
                onChange={() => this.setConfig("logErrors", !logErrors)}
              />
            </div>

            <div>
              <label style={{ marginRight: 5 }}>记录警告</label>
              <input
                type={"checkbox"}
                checked={logWarnings}
                onChange={() => this.setConfig("logWarnings", !logWarnings)}
              />
            </div>
          </ConfigPanel>
        ) : null}
      </Container>
    );
  }
}
