import { useState, useEffect, useCallback } from "react";











async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message || 'Request failed');
    }
    return resData;
}





// 发送HTTP请求的辅助函数
// 参数:
//   url: 请求的URL地址
//   config: 请求的配置选项
// 返回:
//   解析后的响应数据
// 如果请求失败会抛出错误
export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();


    function clearData(setData) {
        setData(initialData);
    }



    // 发送请求的函数
    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            try {
                const resData = await sendHttpRequest(url, { ...config, body: data });
                setData(resData);

            } catch (error) {
                setError(error.message || error.toString() || 'Something went wrong');
            }
            setIsLoading(false);
        }, [url, config]);

    // 如果配置了GET请求,则立即发送请求
    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData,
    };
}