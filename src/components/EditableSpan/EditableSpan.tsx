import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface EditableSpanType {
 value: string;
 onChange: (newTitle: string) => void;
}

export const EditableSpan = ({
 value,
 onChange,
}: EditableSpanType) => {
 console.log("EditableSpan called");

 const [editMode, setEditMode] = useState<boolean>(false);
 const [title, setTitle] = useState<string>(value);
 const activateEditModeHandler = () => {
  setEditMode(true);
 };
 const deactivateEditModeHandler = () => {
  setEditMode(false);
  onChange(title);
 };

 return (
  <div>
   {editMode ? (
    <TextField
     variant={"outlined"}
     value={title}
     size={"small"}
     onChange={(e: ChangeEvent<HTMLInputElement>) =>
      setTitle(e.currentTarget.value)
     }
     onBlur={deactivateEditModeHandler}
     autoFocus
    />
   ) : (
    // <input
    //  onBlur={deactivateEditModeHandler}
    //  value={title}
    //  onChange={(e: ChangeEvent<HTMLInputElement>) =>
    //   setTitle(e.currentTarget.value)
    //  }
    //  autoFocus
    // />
    <span onDoubleClick={activateEditModeHandler}>
     {value}
    </span>
   )}
  </div>
 );
};
