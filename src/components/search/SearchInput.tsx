import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {onSearchValueChanged} from "../../modules/search/actions";
import {IMainState} from "../../modules/states";

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
      <input
        name="search"
        type="text"
        placeholder="Type repository name"
        onChange={this.props.onChangeValue}
        value={this.props.searchValue} />
    );
  }
}

export const SearchInput: React.ComponentClass<{}> = connect<IStateProps, IDispatchProps, {}, IMainState>(
  (state: IMainState): IStateProps => {
    return {
      searchValue: state.search.value,
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
