import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {onSearchValueChanged} from "../../modules/search/actions";
import {IMainState} from "../../modules/states";
import SearchInputWrapper from "./SearchInputWrapper";

interface IDispatchProps {
  onChangeValue: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

interface IStateProps {
  searchValue: string;
}

interface IProps extends IDispatchProps, IStateProps {
}

class SearchInputComponent extends React.Component<IProps, {}> {

  public render(): JSX.Element {
    return (
      <SearchInputWrapper>
        <label htmlFor="search">Repository name:</label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Type repository name"
          onChange={this.props.onChangeValue}
          value={this.props.searchValue} />
      </SearchInputWrapper>
    );
  }
}

export const SearchInput: React.ComponentClass<{}> = connect<IStateProps, IDispatchProps, {}, IMainState>(
  (state: IMainState): IStateProps => {
    return {
      searchValue: state.search.inputValue,
    };
  },
  (dispatch: Dispatch): IDispatchProps => {
    return {
      onChangeValue(e: React.SyntheticEvent<HTMLInputElement>): void {
        dispatch(onSearchValueChanged(e.currentTarget.value));
      },
    };
  },
)(SearchInputComponent);
