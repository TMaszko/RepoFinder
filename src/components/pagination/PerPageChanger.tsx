import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {onPaginationChangePerPage} from "../../modules/pagination/actions";
import {IMainState} from "../../modules/states";

interface IStateProps {
  perPage: number;
}

interface IDispatchProps {
  onChangePerPage: (newPerPage: number) => void;
}

interface IOwnProps {
  options: number[];
}

interface IProps extends IStateProps, IOwnProps, IDispatchProps {
}

class PerPageChangerComponent extends React.Component<IProps> {

  public render(): JSX.Element {
    return (
      <select
        onChange={(e: React.SyntheticEvent<HTMLSelectElement>) =>
          this.props.onChangePerPage(this.props.options[e.currentTarget.selectedIndex])
        }
      >
        {this.props.options.map(perPage =>
          <option key={perPage} value={perPage}>{perPage}</option>,
        )}
      </select>
    );
  }
}

export const PerPageChanger: React.ComponentClass<IOwnProps> = connect<IStateProps, IDispatchProps, IOwnProps, IMainState>(
  (state: IMainState): IStateProps => {
    return {
      perPage: state.pagination.perPage,
    };
  },
  (dispatch: Dispatch): IDispatchProps => {
    return {
      onChangePerPage(newPerPage: number): void {
        dispatch(onPaginationChangePerPage(newPerPage));
      },
    };
  },
)(PerPageChangerComponent);
