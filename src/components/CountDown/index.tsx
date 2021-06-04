import React, { useEffect, useState } from 'react';
import { CountTitle, CountWrapper } from './styles';

interface Props {
    timer: number;
    onFinish: () => void;
}

let fnTimer: any;
const CountDown:React.FC<Props> = ({timer, onFinish}) => {
    const [counter, setCounter] = useState(timer);

    useEffect(() => {
        if (counter === 0) {
            setCounter(timer);
            onFinish();
        }
        fnTimer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(fnTimer);
    }, [counter]);

    return (
        <CountWrapper>
            <CountTitle>Timer: {counter}</CountTitle>
        </CountWrapper>
    );
}

export default CountDown;