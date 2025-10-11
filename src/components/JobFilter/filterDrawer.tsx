import React, { useEffect, useState } from "react";
import { colorStyles } from "@/styles";
import {
  Stack,
  Typography,
  FormGroup,
  Checkbox,
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
  SEARCH_INPUT_CONFIG,
  CATEGORY_CHECKBOX_CONFIG,
  JOB_TYPE_CHECKBOX_CONFIG,
  EXPERIENCE_LEVEL_CHECKBOX_CONFIG,
  TAGS_CONFIG,
  DATE_POSTED_CHECKBOX_CONFIG,
  JOB_ROLE_OPTIONS,
  JOB_TYPE_OPTIONS,
  EXPERIENCE_OPTIONS,
} from "@/constants";

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

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = event.target;

    const localString = `&${name}=${filterRemoveSpace(value)}`;

    if (checked) {
      setFilterSearchString((prev) => prev.concat(localString));
      setSelectedFilters((prev) => [...prev, value]);
    } else {
      setFilterSearchString((prev) => prev.replace(localString, ""));
      setSelectedFilters((prev) => prev.filter((item) => item !== value));
    }
  };

  handleFilterChange(filterSearchString);

  const filterRemoveSpace = (filterString: string) => {
    return filterString.replaceAll(" ", "_");
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
            py: 3,
          }}
        >
          {Object.entries(SIDEBAR_SECTIONS).map(([key, { title }]) => (
            <Stack key={`filterDrawerEntries-${key}`}>
              <Typography {...SIDEBAR_TITLE_CONFIG({ text: title })} />

              <When condition={key === FILTER_KEYS.SEARCH}>
                <Input
                  inputProps={{
                    ...SEARCH_INPUT_CONFIG.textFieldProps,
                    size: "medium",
                  }}
                />
              </When>
              <When condition={key === FILTER_KEYS.LOCATION}>
                <FormGroup>
                  <Dropdown
                    value={" "}
                    onChange={() => {}}
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
                      <Checkbox
                        key={`datePosted-${index}`}
                        label={option}
                        name="datePosted"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={onFilterChange}
                      />
                    )
                  )}
                </FormGroup>
              </When>

              <When condition={key === FILTER_KEYS.SALARY}>
                <>
                  <Slider
                    //   {...SALARY_SLIDER_CONFIG.sliderProps}
                    defaultValue={50}
                    min={0}
                    max={100}
                    marks
                    valueLabelDisplay="auto"
                  />
                  <Stack
                    stackProps={{
                      direction: "row",
                      spacing: 1,
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      typographyProps={{
                        variant: "body2",
                        component: "span",
                        children: SALARY_SLIDER_CONFIG.label,
                      }}
                    />
                    <Button buttonProps={SALARY_SLIDER_CONFIG.buttonProps} />
                  </Stack>
                </>
              </When>

              {/* <When condition={key === FILTER_KEYS.TAGS}>
                <Stack
                  stackProps={{
                    flexDirection: "row",
                    width: "280px",
                    className: " flex flex-wrap gap-1.5",
                  }}
                >
                  {TAGS_CONFIG.tags.map((tag: string, index: number) => (
                    <Chip
                      key={`filterDrawerChip-${index}`}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: colorStyles.filterTagsBackgroundColor,
                        color: colorStyles.filterTagsTextColor,
                      }}
                      className="w-fit cursor-pointer p-1 gap-1 text-sm"
                    />
                  ))}
                </Stack>
              </When> */}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default FilterDrawer;
