import "katex/dist/katex.min.css";
import katex from "katex";
import { useEffect, useRef } from "react";

export function InlineMath({ math }) {
	const spanRef = useRef(null);

	useEffect(() => {
		if (spanRef.current) {
			katex.render(math, spanRef.current, {
				throwOnError: false,
				displayMode: false,
			});
		}
	}, [math]);

	return <span ref={spanRef} />;
}

export function BlockMath({ math }) {
	const divRef = useRef(null);

	useEffect(() => {
		if (divRef.current) {
			katex.render(math, divRef.current, {
				throwOnError: false,
				displayMode: true,
			});
		}
	}, [math]);

	return <div ref={divRef} />;
}
