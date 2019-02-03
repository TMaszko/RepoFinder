import "firebase/auth";

import * as firebase from "firebase/app";
import * as React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {ResultsTable} from "./components/results/ResultsTable";
import {SearchInput} from "./components/search/SearchInput";
import {IMainState} from "./modules/states";
import {onUserAuthFailed, onUserAuthSuccessful} from "./modules/user/actions";
import {IUser} from "./modules/user/IUser";

interface IConfig {
  apiKey: string;
  authDomain: string;
}

interface IUiConfig {
  signInFlow: string;
  signInSuccessUrl: string;
  signInOptions: string[];
}

interface IDispatchProps {
  onUserAuthSuccessful: (user: IUser) => void;
  onUserAuthFailed: () => void;
}

interface IStateProps {
  isAuth: boolean;
}

interface IProps extends IDispatchProps, IStateProps {
}

const config: IConfig = {
  apiKey: "AIzaSyAuVmaz_GEtdDf07NdBdqdNFkWH9K7978o",
  authDomain: "repo-finder.firebaseapp.com",
};

firebase.initializeApp(config);

const uiConfig: IUiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
};

interface IState {
  isCheckedIfAuth: boolean;
}

class App extends React.Component<IProps, IState> {

  public state: IState = {
    isCheckedIfAuth: false,
  };

  public componentDidMount(): void {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.props.onUserAuthSuccessful({ uid: user.providerData[0]!.uid });
      } else {
        this.props.onUserAuthFailed();
      }
      this.setState({
        isCheckedIfAuth: true,
      });
    });
  }

  public render(): JSX.Element {
    return (
      <>
        <SearchInput />
        {this.state.isCheckedIfAuth && <ResultsTable />}
        {this.state.isCheckedIfAuth && !this.props.isAuth && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
      </>
    );
  }
}

export default connect<IStateProps, IDispatchProps, {}, IMainState>(
  (state: IMainState): IStateProps => {
    return {
      isAuth: state.user.isAuth,
    };
  },
  (dispatch: Dispatch): IDispatchProps => {
    return {
      onUserAuthSuccessful(user: IUser): void {
        dispatch(onUserAuthSuccessful(user));
      },
      onUserAuthFailed(): void {
        dispatch(onUserAuthFailed());
      },
    };
  },
)(App);
