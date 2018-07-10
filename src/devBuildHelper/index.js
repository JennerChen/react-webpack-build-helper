import React, { Component } from "react";
import ReactDom, { unmountComponentAtNode } from "react-dom";
import stripAnsi from "strip-ansi";
import BuildStatusIcon from "./BuildStatusIcon";
import { CompileError, CompileWarning } from "../overlay";
const DefaultSetting = {
  autoRefresh: false,
  showErrors: true,
  showWarnings: false,
  logErrors: true,
  logWarnings: true
};

const overlayStyle =
  "position:fixed;width: 100%;height:100%;z-index:2100000000;left:0;top:0;text-align:center;background-color:rgba(255,255,255,.8);";
class BuildHelper {
  constructor() {
    this.isFirstBuild = true;
    this.initBuildIsError = false;
    this.container = document.createElement("div");
    this._onChangeConfig = this._onChangeConfig.bind(this);

    document.body.appendChild(this.container);

    this.config = this.getStorageSetting();

    this.infoBar = ReactDom.render(
      <BuildStatusIcon
        onChangeConfig={this._onChangeConfig}
        {...this.config}
      />,
      this.container
    );
  }

  getStorageSetting() {
    let result = localStorage.getItem("rwbh");
    if (result) {
      try {
        result = JSON.parse(result);
      } catch (e) {
        result = DefaultSetting;
      }
    }

    return Object.assign({}, DefaultSetting, result || {});
  }

  _onChangeConfig(key, value) {
    this.config[key] = value;

    localStorage.setItem("rwbh", JSON.stringify(this.config));
  }

  showSuccess() {
    if (this.initBuildIsError) {
      window.location.reload();
    }
    this.dismissOverlays();
    this.clearConsole();

    if (this.isFirstBuild) {
      this.isFirstBuild = false;
    } else {
      this.showOutDate();

      this.checkAutoRefresh();
    }

    this.infoBar.status("success");
  }

  showErrors(errors) {
    this.dismissOverlays();
    this.clearConsole();

    if (this.isFirstBuild) {
      this.isFirstBuild = false;
      this.initBuildIsError = true;
    } else {
      this.showOutDate();
      if (!this.config.showErrors) {
        this.checkAutoRefresh();
      }
    }

    if (this.config.showErrors) {
      this.createErrorOverlay(errors);
    }

    if (this.config.logErrors) {
      if (
        typeof console !== "undefined" &&
        typeof console.error === "function"
      ) {
        for (let i = 0; i < errors.length; i++) {
          console.error(stripAnsi(errors[i]));
        }
      }
    }
    this.infoBar.status("error");
  }

  showWarnings(warnings) {
    if (this.initBuildIsError) {
      window.location.reload();
    }
    this.dismissOverlays();
    this.clearConsole();

    if (this.isFirstBuild) {
      this.isFirstBuild = false;
    } else {
      this.showOutDate();
      if (!this.config.showWarnings) {
        this.checkAutoRefresh();
      }
    }

    if (this.config.showWarnings) {
      this.createWarningOverlay(warnings);
    }

    if (this.config.logWarnings) {
      if (
        typeof console !== "undefined" &&
        typeof console.warn === "function"
      ) {
        for (let i = 0; i < warnings.length; i++) {
          if (i === 5) {
            console.warn(
              "There were more warnings in other files.\n" +
                "You can find a complete log in the terminal."
            );
            break;
          }
          console.warn(stripAnsi(warnings[i]));
        }
      }
    }
    this.infoBar.status("warning");
  }

  showOutDate() {
    this.infoBar.outDate();
  }

  checkAutoRefresh() {
    if (this.config.autoRefresh) {
      window.location.reload();
    }
  }

  createErrorOverlay(errors) {
    if (this.errorContainer) {
      unmountComponentAtNode(this.errorContainer);
    } else {
      this.errorContainer = document.createElement("div");
      this.errorContainer.style = overlayStyle;
      document.body.appendChild(this.errorContainer);
    }

    ReactDom.render(<CompileError error={errors[0]} />, this.errorContainer);
  }

  createWarningOverlay(warnings) {
    if (this.warningOverlay) {
      unmountComponentAtNode(this.warningOverlay);
    } else {
      this.warningOverlay = document.createElement("div");
      this.warningOverlay.style = overlayStyle;
      document.body.appendChild(this.warningOverlay);
    }

    ReactDom.render(
      <CompileWarning warning={warnings[0]} />,
      this.warningOverlay
    );
  }

  dismissOverlays() {
    if (this.errorContainer) {
      unmountComponentAtNode(this.errorContainer);
      document.body.removeChild(this.errorContainer);
      this.errorContainer = null;
    }

    if (this.warningOverlay) {
      unmountComponentAtNode(this.warningOverlay);
      document.body.removeChild(this.warningOverlay);
      this.warningOverlay = null;
    }
  }

  clearConsole() {
    if (typeof console !== "undefined" && typeof console.clear === "function") {
      console.clear();
    }
  }
}

if (process.env.NODE_ENV === "production") {
  console.warn(
    "devBuildHelper is not meant for use in production. You should " +
      "ensure it is not included in your build to reduce bundle size."
  );
}

export default BuildHelper;
