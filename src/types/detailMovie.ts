export interface detailMovie {
  path: string;
  label: string;
  desc: string;
}

export type DetailProps = {
  detailMovies: detailMovie[];
};
