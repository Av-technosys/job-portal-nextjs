import React from "react";
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
} from "@/constants";

const FilterDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
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
                  {CATEGORY_CHECKBOX_CONFIG.options.map(
                    (option: string, index: number) => (
                      <Checkbox
                        key={`filterDrawerCategory-${index}`}
                        formControlLabelProps={{
                          label: option,
                          control: <input type="checkbox" />,
                        }}
                      />
                    )
                  )}
                  <Button buttonProps={CATEGORY_CHECKBOX_CONFIG.buttonProps} />
                </FormGroup>
              </When>

              <When condition={key === FILTER_KEYS.JOB_TYPE}>
                <FormGroup>
                  {JOB_TYPE_CHECKBOX_CONFIG.options.map(
                    (option: string, index: number) => (
                      <Checkbox
                        key={`filterDrawerJobType-${index}`}
                        formControlLabelProps={{
                          label: option,
                          control: <input type="checkbox" />,
                        }}
                      />
                    )
                  )}
                </FormGroup>
              </When>

              <When condition={key === FILTER_KEYS.EXPERIENCE}>
                <FormGroup>
                  {EXPERIENCE_LEVEL_CHECKBOX_CONFIG.options.map(
                    (option: string, index: number) => (
                      <Checkbox
                        key={`filterDrawerExperience-${index}`}
                        formControlLabelProps={{
                          label: option,
                          control: <input type="checkbox" />,
                        }}
                      />
                    )
                  )}
                </FormGroup>
              </When>

              <When condition={key === FILTER_KEYS.DATE_POSTED}>
                <FormGroup>
                  {DATE_POSTED_CHECKBOX_CONFIG.options.map(
                    (option: string, index: number) => (
                      <Checkbox
                        key={`filterDrawerDatePosted-${index}`}
                        formControlLabelProps={{
                          label: option,
                          control: <input type="checkbox" />,
                        }}
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

              <When condition={key === FILTER_KEYS.TAGS}>
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
              </When>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default FilterDrawer;
