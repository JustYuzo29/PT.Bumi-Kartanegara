import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Articles() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/articles/").then(r => setItems(r.data));
  }, []);

  return (
    <ul className="space-y-2">
      {items.map(a => (
        <li key={a.id} className="p-3 rounded bg-white shadow">
          <h3 className="font-bold">{a.title}</h3>
          <p>{a.body}</p>
        </li>
      ))}
    </ul>
  );
}
