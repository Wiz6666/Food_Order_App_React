//组件的目的: 输出错误信息
export default function Error({ title, message }) {
    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}