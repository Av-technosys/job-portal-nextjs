import { TabsProps as MUITabsProps } from "@mui/material";
import { ElementRenderType } from "../common";

export interface TabsProps {
  items: {
    label?: ElementRenderType;
    value: string;
    key: string;
    children: ElementRenderType;
    icon?: React.ReactElement<unknown>;
  }[];
  tabsProps?: MUITabsProps;
  handleTabChange?: (newValue: string) => void;
  tabPanelWidth?: string;
}

export interface TabPanelProps {
  children?: ElementRenderType;
  selectedTab: string;
  value: string;
}
