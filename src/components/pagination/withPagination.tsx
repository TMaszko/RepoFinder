import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {onPaginationChangePage, onPaginationNextPage, onPaginationPrevPage} from "../../modules/pagination/actions";
import {IMainState} from "../../modules/states";
import Arrow from "../table/Arrow";
import {IWithItems} from "../table/Table";
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

interface IOwnProps<ArrayItemsType> extends IWithItems<ArrayItemsType> {
  perPage: number;
  visiblePages: number;
}

export type IInjectedProps<ArrayItemsType> = IOwnProps<ArrayItemsType>;
interface IProps<ArrayItemsType> extends IOwnProps<ArrayItemsType>, IDispatchProps, IStateProps {
}

export const withPagination: <ArrayItemsType, ComponentProps extends object> (
  Component: React.ComponentType<ComponentProps & IWithItems<ArrayItemsType>>,
) => React.ComponentType<ComponentProps & IOwnProps<ArrayItemsType>> =
  <ArrayItemsType, ComponentProps extends object>(Component: React.ComponentType<ComponentProps & IWithItems<ArrayItemsType>>) => {

    class PaginationComponent extends React.Component<IProps<ArrayItemsType>> {
      public render(): JSX.Element {
        const pages: number = Math.ceil(this.props.items.length / this.props.perPage);
        const itemsToShow: ArrayItemsType[] = this.props.items.slice(
          this.props.currentPage * this.props.perPage,
          (this.props.currentPage + 1) * this.props.perPage);

        return (
          <ContentWrapper>
            <Component {...(this.props as ComponentProps)} items={itemsToShow} />
            {itemsToShow.length > 0 &&
              <PaginationWrapper>
                <Arrow left onClick={() => this.props.onPrevPage(this.props.currentPage)} />
                {[...Array(this.props.visiblePages)].map((_, pageIndex: number) => {
                  const pageElementPosition: number = this.props.currentPage % this.props.visiblePages;
                  const pageNum: number = pageIndex + 1 + this.props.currentPage - pageElementPosition;
                  return (
                    pageNum <= pages &&
                    <PageNumber
                      isActive={pageNum - 1 === this.props.currentPage}
                      key={pageIndex}
                      onClick={() => this.props.onChangePage(pageNum - 1)}
                    >
                      {pageNum}
                    </PageNumber>
                  );
                })}
                <Arrow right onClick={() => this.props.onNextPage(this.props.currentPage, pages)} />
                <span>
                  of {pages}
                </span>
              </PaginationWrapper>
            }
          </ContentWrapper>

        );
      }
    }

    return connect<IStateProps, IDispatchProps, ComponentProps & IOwnProps<ArrayItemsType>, IMainState>(
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
    )(PaginationComponent);

  };
