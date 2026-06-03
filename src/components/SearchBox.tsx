interface Props {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: Props) {
  return (
    <input
      placeholder="Search notes"
      onChange={e => onSearch(e.target.value)}
    />
  );
}