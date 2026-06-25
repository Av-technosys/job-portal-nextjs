import React, { KeyboardEvent, useState } from "react";
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { SkillsInputProps } from "@/types";
import { colorStyles } from "@/styles";
import When from "./When";

function SkillsInput({
  inputProps,
  formControlProps,
  value = [],
  onChange,
  error,
  helperText,
}: SkillsInputProps) {
  const [skillInputValue, setSkillInputValue] = useState("");

  const addSkill = () => {
    const nextSkill = skillInputValue.trim();
    if (!nextSkill) return;

    const isDuplicate = value.some(
      (skill) => skill.toLowerCase() === nextSkill.toLowerCase()
    );

    if (!isDuplicate) onChange?.([...value, nextSkill]);
    setSkillInputValue("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    addSkill();
  };

  const removeSkill = (skillToRemove: string) => {
    onChange?.(value.filter((skill) => skill !== skillToRemove));
  };

  return (
    <FormControl {...formControlProps} error={error}>
      <TextField
        {...inputProps}
        value={skillInputValue}
        onChange={(event) => setSkillInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addSkill}
        error={error}
        autoComplete="off"
      />
      <When condition={value.length > 0}>
        <Box className="mt-3 flex flex-wrap gap-2">
          {value.map((skill) => (
            <Chip
              key={`job-skill-${skill}`}
              label={skill}
              onDelete={() => removeSkill(skill)}
              size="small"
              sx={{
                bgcolor: colorStyles.filterTagsBackgroundColor,
                color: colorStyles.filterTagsTextColor,
              }}
              className="w-fit p-1 gap-1 text-sm"
            />
          ))}
        </Box>
      </When>
      <When condition={Boolean(helperText)}>
        <FormHelperText>{helperText}</FormHelperText>
      </When>
    </FormControl>
  );
}

export default SkillsInput;
