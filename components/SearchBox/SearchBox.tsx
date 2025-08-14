import Style from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (query: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={Style.wrapper}>
      <label htmlFor="search-notes" className={Style.label}>
        Search Notes
      </label>
      <input
        id="search-notes"
        className={Style.input}
        onChange={handleChange}
        type="text"
        value={value}
        placeholder="Search notes"
      />
    </div>
  );
}
