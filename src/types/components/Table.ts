import { ElementRenderType } from "../common";

interface Column {
  field: string;
  headerName: ElementRenderType;
}

export interface TableProps {
  columns: Column[];
  data: Record<string, ElementRenderType>[];
}
