import { ListItemProps, ListProps } from "@/types";
import {
  List as MUIList,
  ListItem as MUIListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import When from "./When";
import Tooltip from "./Tooltip";
import React from "react";

function ListItem({
  text,
  icon,
  listItemButton,
  listValue,
  defaultListValue,
  onClick,
}: ListItemProps & {
  defaultListValue?: string;
  onClick?: (listValue: string) => void;
}) {
  return (
    <MUIListItem key={text} disablePadding>
      <ListItemButton
        {...listItemButton}
        selected={defaultListValue === listValue}
        onClick={() => onClick && onClick(listValue)}
      >
        <When condition={icon !== undefined}>
          <ListItemIcon {...icon} />
        </When>
        <ListItemText primary={text} />
      </ListItemButton>
    </MUIListItem>
  );
}

function List({ listOptions, defaultListValue, onClick }: ListProps) {
  return (
    <>
      <MUIList>
        {listOptions?.map(({ key, ...props }) => (
          <React.Fragment key={`listOptions-${key}`}>
            <When condition={props?.toolipText !== undefined}>
              <Tooltip title={props?.toolipText || ""}>
                <span>
                  <ListItem
                    {...props}
                    defaultListValue={defaultListValue}
                    onClick={onClick}
                  />
                </span>
              </Tooltip>
            </When>
            <When condition={props?.toolipText === undefined}>
              <ListItem
                {...props}
                defaultListValue={defaultListValue}
                onClick={onClick}
              />
            </When>
          </React.Fragment>
        ))}
      </MUIList>
    </>
  );
}

export default List;
