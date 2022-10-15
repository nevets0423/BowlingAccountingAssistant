export interface IIpcRendererQueueItem{
    Params: any;
    Channel: string;
    ResponseChannel: string;
    next: (value: any) => void;
    error: { (value: any) : void } | null;
}