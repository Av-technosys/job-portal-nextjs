import React, { useState } from "react";
import { Button, Stack } from "@/components";
import FilterDrawer from "./filterDrawer";
import { ButtonSizeEnum, ButtonVariantEnum } from "@/types";
import { colorStyles } from "@/styles";

const FilterButton = ({
  handleFilterChange,
  isFilterOpen,
  setIsFilterOpen,
}: {
  handleFilterChange: (filterChange: string) => void;
  isFilterOpen?: boolean;
  setIsFilterOpen?: any;
}) => {
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <Stack>
      {/* Button to open filter drawer */}
      <Button
        onClick={handleOpenFilter}
        buttonProps={{
          variant: ButtonVariantEnum.CONTAINED,
          color: colorStyles.listTitleBackgroundColor,
          size: ButtonSizeEnum.LARGE,
          sx: { px: "24px", py: "14px" },
          children: "Filters",
        }}
      />

      {/* Filter Drawer */}
      <FilterDrawer
        open={isFilterOpen}
        onClose={handleCloseFilter}
        handleFilterChange={handleFilterChange}
      />
    </Stack>
  );
};

export default FilterButton;
