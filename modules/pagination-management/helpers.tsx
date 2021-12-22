import Elipsis from "../../components/pagination/elipsis";

export const getFirstItem = (page: number, lastPage: number) => {
  if (lastPage > 4) {
    if (page < 3) {
      return 1;
    } else {
      if (page > lastPage - 3) {
        return lastPage - 4;
      } else {
        return page - 2;
      }
    }
  } else {
    return 1;
  }
};

export const getLastItem = (page: number, lastPage: number) => {
  if (lastPage > 4) {
    if (page < 3) {
      return 4;
    } else {
      if (page > lastPage - 3) {
        return lastPage - 1;
      } else {
        return page + 1;
      }
    }
  } else {
    return lastPage - 1;
  }
};

export const showFirstElipsis = (page: number, lastPage: number) => {
  if (lastPage > 5 && page > 3) {
    return <Elipsis />;
  }
};

export const showLastElipsis = (page: number, lastPage: number) => {
  if (lastPage > 5 && page < lastPage - 2) {
    return <Elipsis />;
  }
};
