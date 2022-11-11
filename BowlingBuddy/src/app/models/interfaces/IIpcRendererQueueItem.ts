export interface IIpcRendererQueueItem{
    Params: any;
    Channel: string;
    ResponseChannel: string;
    resolve: (value: any) => void;
    reject: (value: any) => void;
}