import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(dom = "div") {
    const [show, setShow] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        function handleClickOut(e) {
            if (
                nodeRef &&
                !nodeRef.current.contains(e.target) &&
                !e.target.matches(dom)
            )
                setShow(false);
        }
        document.addEventListener("click", handleClickOut);
        return () => {
            document.removeEventListener("click", handleClickOut);
        };
    }, [dom]);

    // console.log(setShow);
    // console.log(nodeRef);

    return {
        show,
        setShow,
        nodeRef,
    };
}
