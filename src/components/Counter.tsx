import { useState } from "react";
import s from "./Counter.module.css";
export function Counter() {
 const [count, setCount] = useState(0);
 return (
  <>
   <h1 className={s.head}>{count}</h1>
   <button onClick={() => setCount(count + 1)}>
    Increment
   </button>
  </>
 );
}
