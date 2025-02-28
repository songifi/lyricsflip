// an interface is a way to define the shape of an object, describing the structure and types of its properties
export class paginated<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    firstPage: string;
    lastPage: string;
    previousPage: string;
    currentPage: string;
    nextPage: string;
  };
}
