export interface ISearchRepoResult {
  id: string;
  title: string;
  owner: string;
  stars: number;
  createdAt: Date;
  [key: string]: string | number | Date;
}
