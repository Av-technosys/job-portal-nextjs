import React, { useEffect, useState } from "react";
import { Tabs as MUITabs, Tab } from "@mui/material";
import { TabPanelProps, TabsProps } from "@/types";
import When from "./When";

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, selectedTab, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== selectedTab}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      {...other}
    >
      <When condition={selectedTab === value}>{children}</When>
    </div>
  );
}

function Tabs({ items = [], tabsProps, handleTabChange }: TabsProps) {
  const [value, setValue] = useState(tabsProps?.defaultValue as string);

  useEffect(() => {
    setValue(tabsProps?.defaultValue as string);
  }, [tabsProps?.defaultValue]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    handleTabChange?.(newValue);
  };

  return (
    <>
      <MUITabs {...tabsProps} value={value} onChange={handleChange}>
        {items.map((item) => (
          <Tab
            key={`ja-Tabs-${item.key}`}
            label={item?.label}
            value={item.value}
            icon={item?.icon}
            onClick={item.onClick}
          />
        ))}
      </MUITabs>
      <div className={"w-full"}>
        {items.map((item) => (
          <CustomTabPanel
            key={`ja-CustomTabPanel-${item.key}`}
            value={item.value}
            selectedTab={value}
          >
            {item.children}
          </CustomTabPanel>
        ))}
      </div>
    </>
  );
}

export default Tabs;
