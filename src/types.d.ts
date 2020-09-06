export interface ApiResult {
  pageCount: number;
  books: Book[];
}

interface Book {
  id: string;
  title: string;
  length: number;
  releaseDate: string;
  seriesBookIndex: string;
  seriesId: string;
  rating: number;
  language: string;
  imageId: string;
  seriesName: string;
  authors: string[];
}

interface LibraryBook {
  id: string;
  authors: string[];
  downloaded: boolean;
}

type Progress = (pos: number, tot: number) => void;

type BookMap = { [id: string]: Book };

interface FilterConfig {
  orderBy: string;
  textFilter: string;
  filter: { [key: string]: any };
  desc: boolean;
}

interface Author {
  id: number;
  name: string;
  progress: number;
}
