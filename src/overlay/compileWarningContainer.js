import React, { PureComponent } from "react";
import generateAnsiHTML from "./util/generateAnsiHTML";
import ErrorOverlay from "./components/ErrorOverlay";
import Header from "./components/Header";
import CodeBlock from "./components/CodeBlock";

class CompileErrorContainer extends PureComponent {
  render() {
    const { warning } = this.props;

    return (
      <ErrorOverlay>
        <Header headerText="Warning to compile" />
        <div>
          <CodeBlock main={true} codeHTML={generateAnsiHTML(warning)} />
        </div>
      </ErrorOverlay>
    );
  }
}

export default CompileErrorContainer;
