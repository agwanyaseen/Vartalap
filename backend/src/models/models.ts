export interface SaveContextRequest {
    context: string
}

export interface InteractRequest{
    query: string;
    chatSessionId?: string 
}


export class GenericResponseModel<T>{
    data: T | null;
    error: string | null

    constructor(data: T | null= null, error: string | null = null) {
        this.data= data;
        this.error = error
    }
    
    static success<T>(data: T): GenericResponseModel<T> {
        return new GenericResponseModel<T>(data);
    }

    static failure<T>(error: string): GenericResponseModel<T> {
        return new GenericResponseModel<T>(null,error);
    }

}