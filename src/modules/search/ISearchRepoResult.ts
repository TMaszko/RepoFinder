export interface ISearchRepoResult {
  id: string;
  title: string;
  owner: string;
  stars: number;
  createdAt: string;
  [key: string]: string | number;
}
