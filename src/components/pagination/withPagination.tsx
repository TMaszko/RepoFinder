import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {onPaginationChangePage, onPaginationNextPage, onPaginationPrevPage} from "../../modules/pagination/actions";
import {IMainState} from "../../modules/states";
import Arrow from "../table/Arrow";
import ContentWrapper from "./ContentWrapper";
import PageNumber from "./PageNumber";
import PaginationWrapper from "./PaginationWrapper";

interface IStateProps {
  currentPage: number;
}

interface IDispatchProps {
  onNextPage: (currentPage: number, maxPages: number) => void;
  onChangePage: (page: number) => void;
  onPrevPage: (currentPage: number) => void;
}

interface IOwnProps<T> {
  items: T[];
  perPage: number;
  visiblePages: number;
}

export type IInjectedProps<T> = IOwnProps<T>;
interface IProps<T> extends IOwnProps<T>, IDispatchProps, IStateProps {
}

type EnhancedProps<T, P> = IProps<T> & P;

export const withPagination: <T, P>(Component: React.ComponentClass<P & IInjectedProps<T>>) => React.ComponentClass<IOwnProps<T>> =
  <T, P>(Component: React.ComponentClass<P>) => {

    const PaginationComponent: React.ComponentClass<EnhancedProps<T, P>> =
      class extends React.Component<EnhancedProps<T, P>> {
        public render(): JSX.Element {
          const pages: number = Math.ceil(this.props.items.length / this.props.perPage);
          const { currentPage } = this.props as EnhancedProps<T, P>;
          const itemsToShow: T[] = this.props.items.slice(currentPage * this.props.perPage, (currentPage + 1) * this.props.perPage);

          return (
            <ContentWrapper>
              <Component {...this.props} items={itemsToShow} />
              {itemsToShow.length > 0 &&
                <PaginationWrapper>
                  <Arrow left onClick={() => this.props.onPrevPage(currentPage)} />
                  {[...Array(this.props.visiblePages)].map((_, pageIndex: number) => {
                    const pageElementPosition: number = currentPage % this.props.visiblePages;
                    const pageNum: number = pageIndex + 1 + currentPage - pageElementPosition;
                    return (
                      pageNum <= pages &&
                      <PageNumber
                        isActive={pageNum - 1 === currentPage}
                        key={pageIndex}
                        onClick={() => this.props.onChangePage(pageNum - 1)}
                      >
                        {pageNum}
                      </PageNumber>
                    );
                  })}
                  <Arrow right onClick={() => this.props.onNextPage(currentPage, pages)} />
                  <span>
                    of {pages}
                  </span>
                </PaginationWrapper>
              }
            </ContentWrapper>

          );
        }
      };

    return connect<IStateProps, IDispatchProps, IOwnProps<T>, IMainState>(
      (state: IMainState): IStateProps => {
        return {
          currentPage: state.pagination.currentPage,
        };
      },

      (dispatch: Dispatch): IDispatchProps => {
        return {
          onNextPage(page: number, maxPages: number): void {
            dispatch(onPaginationNextPage({ page, maxPages }));
          },
          onPrevPage(page: number): void {
            dispatch(onPaginationPrevPage(page));
          },
          onChangePage(page: number): void {
            dispatch(onPaginationChangePage(page));
          },
        };
      },
    )(PaginationComponent as any);
  };
