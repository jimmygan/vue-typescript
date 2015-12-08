// Type definitions for vue-resoure 0.1.17
// Project: https://github.com/vuejs/vue-resource
// Definitions by: kaorun343 <https://github.com/kaorun343>

declare namespace VueResource {
    
    type Callback<U> = (data: any, status?: number, request?: any) => U;

    interface Options {
        url?: string;
        data?: Object | string;
        method?: string;
        params?: Object;
        headers?: {
            [key: string]: string;
        }
        success?: Callback<void>;
        error?: Callback<void>;
        beforeSend?(request: XMLHttpRequest, options: Object): void;
        emulateHTTP?: boolean;
        emulateJSON?: boolean;
        xhr?: XMLHttpRequest;
        jsonp?: string;
        options?: {
            root: string;
        }
    }

    interface VueResourcePromise<R> extends Promise<R> {
        success<U>(callback: Callback<U>): VueResourcePromise<U>;
        error<U>(callback: Callback<U>): VueResourcePromise<U>;
        always<U>(callback: Callback<U>): VueResourcePromise<U>;
    }

    interface $http {
        get(url: string, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
        post(url: string, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
        put(url: string, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
        patch(url: string, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
        delete(url: string, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
        jsonp(url: string, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
        get(url: string, data?: any, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
        post(url: string, data?: any, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
        put(url: string, data?: any, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
        patch(url: string, data?: any, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
        delete(url: string, data?: any, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
        jsonp(url: string, data?: any, success?: Callback<any>, options?: Options): VueResourcePromise<any>;
    }

    interface Resources {
        get(params: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
        save(params: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
        query(params: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
        update(params: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
        remove(params: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
        delete(params: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
        get(params: Object, data?: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
        save(params: Object, data?: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
        query(params: Object, data?: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
        update(params: Object, data?: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
        remove(params: Object, data?: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
        delete(params: Object, data?: Object, success?: Callback<any>, error?: Callback<any>): VueResourcePromise<any>;
    }

    interface Actions {
        get: { method: string; }
        save: { method: string; }
        query: { method: string; }
        update: { method: string; }
        remove: { method: string; }
        delete: { method: string; }
    }

    interface $resource {
        (url: string, params?: Object, actions?: any, options?: Options): Resources;
        actions: Actions;
    }

    interface HTTP extends $http {
        options: {
            root: string;
            [key: string]: any;
        }
        headers: {
            puts: { [key: string]: string; }
            post: { [key: string]: string; }
            patch: { [key: string]: string; }
            delete: { [key: string]: string; }
            common: { [key: string]: string; }
            custom: { [key: string]: string; }
        }
    }
    type Resource = $resource;
}

declare namespace vuejs {
    interface Vue {
        $http: VueResource.$http;
        $resource: VueResource.$resource;
    }
    
    interface VueStatic {
        http: VueResource.HTTP;
        resource: VueResource.$resource;
    }
    
    interface ComponentOption {
        http?: {
            root?: string;
            headers?: {
                [key: string]: string;
            }
            [key: string]: any;
        }
    }
}

declare module "vue-resource" {
    var install: (vue: vuejs.VueStatic) => void;
    export = install;
}