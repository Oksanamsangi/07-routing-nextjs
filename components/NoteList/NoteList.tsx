import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import Link from "next/link";
import Style from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (noteId: number) => deleteNote(noteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  return (
    <ul className={Style.list}>
      {notes.map((note) => (
        <li className={Style.listItem} key={note.id}>
          <div className={Style.header}>
            <h2 className={Style.title}>{note.title}</h2>
            <span className={Style.tag}>{note.tag}</span>
          </div>
          <p className={Style.content}>{note.content}</p>
          <div className={Style.footer}>
            <Link
              className={Style.link}
              href={`/notes/${note.id}`}
              scroll={false}
            >
              View details
            </Link>
            <button
              className={`${Style.button} ${Style.deleteButton}`}
              onClick={() => mutate(note.id)}
              disabled={isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
