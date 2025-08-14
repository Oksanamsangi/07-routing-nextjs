import { ErrorMessage, Field, Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useCallback } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createNote } from "@/lib/api";
import {
  TAG_OPTIONS,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  CONTENT_MAX_LENGTH,
  DEFAULT_TAG,
} from "@/lib/constants";
import type { Tag } from "@/lib/constants";

import Style from "./NoteForm.module.css";

interface NoteFormValues {
  title: string;
  content: string;
  tag: Tag;
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: DEFAULT_TAG,
};

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleSubmit = useCallback(
    (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
      mutation.mutate(values, {
        onSuccess: () => {
          actions.resetForm();
          toast.success("📝 Note created successfully");
          onClose();
        },
      });
    },
    [mutation, onClose]
  );

  const Schema = Yup.object().shape({
    title: Yup.string()
      .min(
        TITLE_MIN_LENGTH,
        `Title must be at least ${TITLE_MIN_LENGTH} characters`
      )
      .max(TITLE_MAX_LENGTH, `Title is too long (max ${TITLE_MAX_LENGTH})`)
      .required("Title is required"),
    content: Yup.string().max(
      CONTENT_MAX_LENGTH,
      `Content is too long (max ${CONTENT_MAX_LENGTH})`
    ),
    tag: Yup.string()
      .oneOf(TAG_OPTIONS, "Invalid category")
      .required("Tag is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={handleSubmit}
    >
      <Form className={Style.form}>
        <div className={Style.formGroup}>
          <label htmlFor="note-title" className={Style.label}>
            Title
          </label>
          <Field
            id="note-title"
            type="text"
            name="title"
            className={Style.input}
            placeholder="Enter title"
          />
          <ErrorMessage name="title" component="span" className={Style.error} />
        </div>

        <div className={Style.formGroup}>
          <label htmlFor="note-content" className={Style.label}>
            Content
          </label>
          <Field
            as="textarea"
            id="note-content"
            name="content"
            rows={8}
            className={Style.textarea}
            placeholder="Write your note..."
          />
          <ErrorMessage
            name="content"
            component="span"
            className={Style.error}
          />
        </div>

        <div className={Style.formGroup}>
          <label htmlFor="note-tag" className={Style.label}>
            Tag
          </label>
          <Field as="select" id="note-tag" name="tag" className={Style.select}>
            {TAG_OPTIONS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
          <ErrorMessage name="tag" component="span" className={Style.error} />
        </div>

        <div className={Style.actions}>
          <button
            type="button"
            className={`${Style.button} ${Style.cancelButton}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${Style.button} ${Style.submitButton}`}
            disabled={mutation.isPending}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
