import * as React from "react";

import {ResultsTable} from "./components/results/ResultsTable";
import {SearchInput} from "./components/search/SearchInput";

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <SearchInput />
        <ResultsTable />
      </>
    );
  }
}

export default App;
