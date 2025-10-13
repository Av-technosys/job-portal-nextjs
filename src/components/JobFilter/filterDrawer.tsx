import React, { useEffect, useState } from "react";
import { colorStyles } from "@/styles";
import {
  Stack,
  Typography,
  FormGroup,
  Checkbox,
  Radio,
  Slider,
  Button,
  Chip,
  Input,
  When,
  Dropdown,
  Drawer,
} from "@/components";
import {
  SIDEBAR_SECTIONS,
  SIDEBAR_CONTAINER_STYLE,
  SIDEBAR_TITLE_CONFIG,
  FILTER_KEYS,
  SALARY_SLIDER_CONFIG,
  LOCATION_SELECT_CONFIG,
  SALARY_SELECT_CONFIG,
  SEARCH_INPUT_CONFIG,
  CATEGORY_CHECKBOX_CONFIG,
  JOB_TYPE_CHECKBOX_CONFIG,
  EXPERIENCE_LEVEL_CHECKBOX_CONFIG,
  TAGS_CONFIG,
  DATE_POSTED_CHECKBOX_CONFIG,
  JOB_ROLE_OPTIONS,
  JOB_TYPE_OPTIONS,
  EXPERIENCE_OPTIONS,
  MIN_SALARY_RANGE_OPTIONS,
} from "@/constants";
import { RadioProps } from "@/types";

const FilterDrawer = ({
  open,
  onClose,
  handleFilterChange,
}: {
  open: boolean;
  onClose: () => void;
  handleFilterChange: (filterChange: string | null) => void;
}) => {
  const [filterSearchString, setFilterSearchString] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedDropdown, setSelectedDropdown] = useState("");

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = event.target;

    const localString = `&${name}=${filterRemoveSpace(value.toString())}`;

    if (checked || value) {
      setSelectedDropdown(value);
      setFilterSearchString((prev) => prev.concat(localString));
      setSelectedFilters((prev) => [...prev, value]);
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

  handleFilterChange(filterSearchString);

  const filterRemoveSpace = (filterString: string) => {
    return filterString?.replaceAll(" ", "_");
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: colorStyles.filterSidebarBackgroundColor,
          scrollbarWidth: "none",
        },
      }}
      className="  overflow-x-hidden   "
    >
      <Stack {...SIDEBAR_CONTAINER_STYLE.stackProps}>
        <Stack
          stackProps={{
            className: "w-50% lg:w-25% ",
            bgcolor: colorStyles.filterSidebarBackgroundColor,
            gap: 3,
            px: 2.5,
            pt: 3,
            mt: { xs: 7, md: 10 },
            pb: 10,
          }}
        >
          {Object.entries(SIDEBAR_SECTIONS).map(([key, { title }]) => (
            <Stack key={`filterDrawerEntries-${key}`}>
              <Typography {...SIDEBAR_TITLE_CONFIG({ text: title })} />
              <When condition={key === FILTER_KEYS.LOCATION}>
                <FormGroup>
                  <Dropdown
                    name="location"
                    value={selectedDropdown}
                    onChange={onFilterChange}
                    options={LOCATION_SELECT_CONFIG.menuItems.map((item) => ({
                      ...item,
                      key: item.value,
                    }))}
                    formControlProps={LOCATION_SELECT_CONFIG.formControlProps}
                    inputLabelProps={LOCATION_SELECT_CONFIG.inputLabelProps}
                  />
                </FormGroup>
              </When>

              <When condition={key === FILTER_KEYS.CATEGORY}>
                <FormGroup>
                  {/* {CATEGORY_CHECKBOX_CONFIG.options.map((option, index) => ( */}
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
                  {/* <Button buttonProps={CATEGORY_CHECKBOX_CONFIG.buttonProps} /> */}
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
                      checked={selectedFilters.includes(
                        value.toString() as string
                      )}
                      onChange={onFilterChange}
                    />
                  ))}
                </FormGroup>
              </When>

              <When condition={key === FILTER_KEYS.DATE_POSTED}>
                <FormGroup>
                  {DATE_POSTED_CHECKBOX_CONFIG.options.map(
                    (option: string, index: number) => (
                      <Radio
                        key={`datePosted-${index}`}
                        label={option}
                        name="datePosted"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={onFilterDateChange}
                      />
                    )
                  )}
                </FormGroup>
              </When>

              <When condition={key === FILTER_KEYS.SALARY}>
                <FormGroup>
                  <Dropdown
                    name="salary"
                    value={selectedDropdown}
                    onChange={onFilterChange}
                    options={MIN_SALARY_RANGE_OPTIONS.map((item) => ({
                      ...item,
                      key: item.value,
                    }))}
                    formControlProps={SALARY_SELECT_CONFIG.formControlProps}
                    inputLabelProps={SALARY_SELECT_CONFIG.inputLabelProps}
                  />
                </FormGroup>
              </When>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default FilterDrawer;
