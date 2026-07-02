import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  FormGroup,
  Checkbox,
  Radio,
  When,
  Dropdown,
} from "@/components/common";
import {
  SIDEBAR_SECTIONS,
  SIDEBAR_TITLE_CONFIG,
  FILTER_KEYS,
  LOCATION_SELECT_CONFIG,
  SALARY_SELECT_CONFIG,
  DATE_POSTED_CHECKBOX_CONFIG,
  JOB_ROLE_OPTIONS,
  JOB_TYPE_OPTIONS,
  EXPERIENCE_OPTIONS,
  MIN_SALARY_RANGE_OPTIONS,
} from "@/constants";

const JobFilterSidebar = ({
  handleFilterChange,
}: {
  handleFilterChange: (filterChange: string | null) => void;
}) => {
  const [filterSearchString, setFilterSearchString] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedDropdown, setSelectedDropdown] = useState("");

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = event.target;
    const localString = `&${name}=${filterRemoveSpace(value.toString())}`;

    if (checked) {
      setSelectedDropdown(value);
      setFilterSearchString((prev: string) =>
        !checked
          ? filterRemoveSpace(prev, localString, "")
          : prev.concat(localString)
      );
      setSelectedFilters((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else {
      setFilterSearchString((prev) => prev.replace(localString, ""));
      setSelectedFilters((prev) => prev.filter((item) => item !== value));
    }
  };

  const onFilterDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = event.target;
    const localString = `&${name}=${filterRemoveSpace(value)}`;

    if (checked) {
      setFilterSearchString(() => localString);
      setSelectedFilters(() => [value]);
    } else {
      setFilterSearchString((prev) => prev.replace(localString, ""));
      setSelectedFilters((prev) => prev.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    handleFilterChange(filterSearchString);
  }, [filterSearchString, handleFilterChange]);

  const filterRemoveSpace = (
    filterString: string,
    stringToReplace: string = " ",
    stringReplaceWith: string = "_"
  ) => {
    return filterString?.replaceAll(stringToReplace, stringReplaceWith);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full hidden md:block">
      <div className="flex justify-between items-center mb-6">
        <Typography typographyProps={{ variant: "h6", className: "font-bold text-gray-800" }}>
          All Filters
        </Typography>
        <Typography typographyProps={{ variant: "body2", className: "text-blue-600 font-medium" }}>
          Applied ({selectedFilters.length})
        </Typography>
      </div>

      <Stack
        stackProps={{
          className: "w-full",
          gap: 4,
        }}
      >
        {Object.entries(SIDEBAR_SECTIONS).map(([key, { title }]) => (
          <Stack key={`sidebarEntries-${key}`} stackProps={{ gap: 1 }}>
            <Typography {...SIDEBAR_TITLE_CONFIG({ text: title })} typographyProps={{ ...SIDEBAR_TITLE_CONFIG({ text: title }).typographyProps, className: "font-semibold mb-2 text-gray-700" }} />
            
            <When condition={key === FILTER_KEYS.LOCATION}>
              <FormGroup>
                <Dropdown
                  name="location"
                  value={selectedDropdown}
                  onChange={onFilterChange as any}
                  options={LOCATION_SELECT_CONFIG.menuItems.map((item) => ({
                    ...item,
                    key: item.value,
                  }))}
                  formControlProps={{ ...LOCATION_SELECT_CONFIG.formControlProps, size: "small" }}
                  inputLabelProps={LOCATION_SELECT_CONFIG.inputLabelProps}
                />
              </FormGroup>
            </When>

            <When condition={key === FILTER_KEYS.CATEGORY}>
              <FormGroup>
                {JOB_ROLE_OPTIONS.map(({ key, value, label }) => (
                  <Checkbox
                    key={key}
                    label={label}
                    name="category"
                    value={value}
                    checked={selectedFilters.includes(value)}
                    onChange={onFilterChange}
                  />
                ))}
              </FormGroup>
            </When>

            <When condition={key === FILTER_KEYS.JOB_TYPE}>
              <FormGroup>
                {JOB_TYPE_OPTIONS.map(({ key, value, label }) => (
                  <Checkbox
                    key={key}
                    label={label}
                    name="jobType"
                    value={value}
                    checked={selectedFilters.includes(value)}
                    onChange={onFilterChange}
                  />
                ))}
              </FormGroup>
            </When>

            <When condition={key === FILTER_KEYS.EXPERIENCE}>
              <FormGroup>
                {EXPERIENCE_OPTIONS.map(({ key, value, label }) => (
                  <Checkbox
                    key={key}
                    label={label}
                    name="experience"
                    value={value}
                    checked={selectedFilters.includes(value.toString())}
                    onChange={onFilterChange}
                  />
                ))}
              </FormGroup>
            </When>

            <When condition={key === FILTER_KEYS.DATE_POSTED}>
              <FormGroup>
                {DATE_POSTED_CHECKBOX_CONFIG.options.map((option: string, index: number) => (
                  <Radio
                    key={`datePosted-${index}`}
                    label={option}
                    name="datePosted"
                    value={option}
                    checked={selectedFilters.includes(option)}
                    onChange={onFilterDateChange}
                  />
                ))}
              </FormGroup>
            </When>

            <When condition={key === FILTER_KEYS.SALARY}>
              <FormGroup>
                <Dropdown
                  name="salary"
                  value={selectedDropdown}
                  onChange={onFilterChange as any}
                  options={MIN_SALARY_RANGE_OPTIONS.map((item) => ({
                    ...item,
                    key: item.value,
                  }))}
                  formControlProps={{ ...SALARY_SELECT_CONFIG.formControlProps, size: "small" }}
                  inputLabelProps={SALARY_SELECT_CONFIG.inputLabelProps}
                />
              </FormGroup>
            </When>
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

export default JobFilterSidebar;
