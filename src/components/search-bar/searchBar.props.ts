export interface ISearchBarProps {
  search: (keyword: string) => void;
  cancelSearch: () => void;
  query: string;
  onTyping: (status: boolean) => void;
  typing: boolean;
}
