import React, { useState } from "react";
import { Button, Stack } from "@/components";
import FilterDrawer from "./filterDrawer";
import { ButtonSizeEnum, ButtonVariantEnum } from "@/types";
import { colorStyles } from "@/styles";

const FilterButton = ({
  handleFilterChange,
}: {
  handleFilterChange: (filterChange: string) => void;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
