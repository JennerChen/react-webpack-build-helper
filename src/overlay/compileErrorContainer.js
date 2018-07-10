import React, { PureComponent } from "react";
import generateAnsiHTML from "./util/generateAnsiHTML";
import parseCompileError from "../react-error-overlay/utils/parseCompileError";
import ErrorOverlay from "./components/ErrorOverlay";
import Header from "./components/Header";
import CodeBlock from "./components/CodeBlock";
import Footer from "./components/Footer";

class CompileErrorContainer extends PureComponent {
  render() {
    const { error, editorHandler } = this.props;
    //    const errLoc = parseCompileError(error);
    return (
      <ErrorOverlay>
        <Header headerText="Failed to compile" />
        <div>
          <CodeBlock main={true} codeHTML={generateAnsiHTML(error)} />
        </div>
        <Footer line1="This error occurred during the build time and cannot be dismissed." />
      </ErrorOverlay>
    );
  }
}

export default CompileErrorContainer;
