export interface ISearchBarState {
  searchTerm: string;
}

export interface ISearchBarProps {
  term: string;
  handleSubmit: (term: string) => void;
}
