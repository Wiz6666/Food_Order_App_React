import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, configs) {
    const response = await fetch(url, configs);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Request failed');
    }

    return resData;
}   

export default function useHttp(url, configs, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() { 
        setData(initialData);
        setError(null);
    }

    // 发送请求
    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            setError(null);
            try {
                const finalConfig = configs.method === 'GET' 
                    ? configs 
                    : {...configs, body: data};
                
                const resData = await sendHttpRequest(url, finalConfig);
                setData(resData);
                return resData;
            } catch (error) {
                setError(error.message || error.toString() || 'Something went wrong');
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        [url, configs]
    );

    useEffect(() => {
        if (url && (!configs || !configs.method || configs.method === 'GET')) {
            sendRequest();
        }
    }, [sendRequest]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    };
}