import { ICellRendererParams } from "ag-grid-community";

export interface InputCellRedererParameters{
    width: number;
    readonly: boolean;
    label: string | undefined;
    getValue: (params: ICellRendererParams<any, any>) => number;
    updateData: ((value: number, data: any) => any) | undefined;
    onChange: ((value: number, rowData: any) => void) | undefined;
    getMin: ((params: ICellRendererParams<any, any>) => number) | undefined;
    getMax: ((params: ICellRendererParams<any, any>) => number) | undefined;
}