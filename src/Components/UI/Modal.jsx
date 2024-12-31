import { createPortal } from 'react-dom';
import Button from './Button.jsx';
import { useRef, useEffect } from 'react';

{/* 
    children 是传入的组件
     open 是是否打开
*/}
export default function Modal({ children, open, className = '' }) {
    {/* 
        useEffect 是 react 的钩子函数
        当 open 发生变化时，会执行里面的代码
    */}

    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
        console.log(modal);
        if (open) {
            modal.showModal();
        }

        return () => { modal.close(); }
    }, [open]);

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`}>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
}