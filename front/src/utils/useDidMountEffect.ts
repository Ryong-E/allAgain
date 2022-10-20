import { useEffect, useRef } from 'react';

// useEffect 사용 시 첫 렌더링 막기 위한 커스텀 훅
const useDidMountEffect = (func: any, deps: any) => {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) func();
		else didMount.current = true;
	}, deps);
};

export default useDidMountEffect;