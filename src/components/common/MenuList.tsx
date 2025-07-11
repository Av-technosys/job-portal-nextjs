import { MenuItem } from "@mui/material";
import { MenuListProps } from "@/types";

function MenuList({ menuItems, onClick }: MenuListProps) {
  return (
    <>
      {menuItems?.map((item) => {
        return (
          <MenuItem
            key={`ja-MenuItems-${item.key}`}
            onClick={(event) => onClick?.(item.key, event)}
          >
            {item.label}
          </MenuItem>
        );
      })}
    </>
  );
}

export default MenuList;
