export interface IDatabase {
    uri: string;

    connect(onOpen: () => void, onError: () => void): Promise<void>;

    disconnect(onClose: () => void, onError: () => void): Promise<void>;
    
}