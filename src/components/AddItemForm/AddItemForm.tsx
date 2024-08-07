import {
 ChangeEvent,
 KeyboardEvent,
 memo,
 useState,
} from "react";
import { TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
interface AddItemFormProps {
 addItem: (title: string) => void;
}

const AddItemForm = memo((props: AddItemFormProps) => {
 console.log("AddItemForm called");

 const { addItem } = props;
 const [title, setTitle] = useState("");
 const [error, setError] = useState<string | null>(null);

 const addItemHandler = () => {
  if (title.trim() !== "") {
   addItem(title.trim());
   setTitle("");
  } else {
   setError("Title is required");
  }
 };

 const changeItemHandler = (
  event: ChangeEvent<HTMLInputElement>
 ) => {
  setTitle(event.currentTarget.value);
 };

 const addItemOnKeyUpHandler = (
  event: KeyboardEvent<HTMLInputElement>
 ) => {
  if (error !== null) {
   setError(null);
  }
  if (event.key === "Enter") {
   addItemHandler();
  }
 };
 return (
  <div className={"addItemForm"}>
   <TextField
    label="Enter a title"
    variant={"outlined"}
    value={title}
    size={"small"}
    error={!!error}
    helperText={error}
    onChange={changeItemHandler}
    onKeyUp={addItemOnKeyUpHandler}
   />
   <IconButton onClick={addItemHandler} color={"primary"}>
    <AddBoxIcon />
   </IconButton>
  </div>
 );
});
export default AddItemForm;
