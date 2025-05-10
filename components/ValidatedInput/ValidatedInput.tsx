"use client";

import clsx from "clsx";
import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";
import { Schema } from "zod";
import styles from "./ValidatedInput.module.scss";

interface ValidatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  wasSubmitted: boolean;
  errors: string;
  fieldSchema: Schema;
}

export const ValidatedInput: FC<ValidatedInputProps> = ({
  name,
  wasSubmitted,
  errors,
  fieldSchema,
  ...props
}) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const getErrors = useCallback(() => {
    const validationResult = fieldSchema.safeParse(value);
    return validationResult.success
      ? []
      : validationResult.error.flatten().formErrors;
  }, [fieldSchema, value]);

  const fieldErrors = errors || getErrors();
  console.log({ fieldErrors });
  const shouldRenderErrors = errors || wasSubmitted || touched;

  const handleBlur = () => setTouched(true);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  return (
    <div className={styles.wrapper}>
      <input
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        className={clsx(
          styles.input,
          !!fieldErrors.length && shouldRenderErrors && styles.errored
        )}
        {...props}
      />
      {shouldRenderErrors && (
        <span className={styles.errorText}>{fieldErrors}</span>
      )}
    </div>
  );
};
