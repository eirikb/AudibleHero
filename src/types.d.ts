export interface ApiResult {
  pageCount: number;
  books: Book[];
}

interface Book {
  id: string;
  title: string;
  length: number;
  releaseDate: string;
  seriesBookIndex?: number;
  seriesBookMaxIndex?: number;
  seriesInLibraryCount?: number;
  seriesInLibrary?: boolean;
  seriesBookIndexInLibrary?: boolean;
  seriesId?: string;
  rating: number;
  language: string;
  imageId: string;
  seriesName: string;
  inLibrary: boolean;
  // domdom doesn't support arrays - yet. Crazy, I know
  authors: { [key: string]: string };
}

interface LibraryBook {
  id: string;
  authors: string[];
}

type Progress = (pos: number, tot: number) => void;

interface FilterConfig {
  orderBy: string;
  textFilter: string;
  desc: boolean;
  filter: {
    inLibrary?: boolean;
    released?: boolean;
    seriesInLibrary?: boolean;
    language?: string;
    seriesBookIndexInLibrary?: boolean;
    ignore?: boolean;
  };
}

interface Author {
  id: number;
  name: string;
  progress: number;
}
