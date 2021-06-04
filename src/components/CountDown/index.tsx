import React, { useCallback, useEffect, useState } from 'react';
import { CountTitle, CountWrapper } from './styles';

interface Props {
    timer: number;
    onFinish: () => void;
}

let fnTimer: any;
const CountDown:React.FC<Props> = ({timer, onFinish}) => {
    const [counter, setCounter] = useState(timer);
    const handleFinish = useCallback(() => {
        onFinish();
    }, [onFinish]);

    useEffect(() => {
        if (counter === 0) {
            setCounter(timer);
            handleFinish();
        }
        fnTimer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(fnTimer);
    }, [counter, handleFinish, timer]);

    return (
        <CountWrapper>
            <CountTitle
                dangerouslySetInnerHTML={{__html:`Timer: ${counter}`}}
            />
        </CountWrapper>
    );
}

export default CountDown;