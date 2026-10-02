import { SegmentedControl } from "../SegmentedControl";

export function TodoWeekFilter({
  weeks,
  value,
  onChange,
}: {
  weeks: number[];
  value: number;
  onChange: (week: number) => void;
}) {
  return (
    <SegmentedControl
      label="Filter by week"
      options={weeks.map((w) => ({ value: w, label: `WEEK ${w}` }))}
      value={value}
      onChange={onChange}
    />
  );
}
