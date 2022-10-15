import { ICellRendererParams } from "ag-grid-community";

export interface buttonRendererParams{
    Name: string;
    onClick: (params: ICellRendererParams<any, any> | undefined) => void;
}