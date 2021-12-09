import { useState } from "react";
import { Form } from "react-bootstrap";

interface Props {
  title: string;
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

export default function CheckBoxGroup({
  title,
  items,
  checked,
  onChange,
}: Props) {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handleChecked(value: string, checked: boolean) {
    let newChecked: string[] = [];
    if (checked) {
      newChecked = [...checkedItems, value];
    } else {
      newChecked = checkedItems.filter((item) => item !== value);
    }
    setCheckedItems(newChecked);
    onChange(newChecked);
  }

  return (
    <Form>
      <p>{title}</p>
      {items.map((item) => (
        <Form.Check
          type="checkbox"
          id={item}
          key={item}
          label={item}
          checked={checkedItems.indexOf(item) !== -1}
          onChange={({ target }) => handleChecked(item, target.checked)}
        />
      ))}
    </Form>
  );
}
