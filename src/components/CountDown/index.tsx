import React, { useEffect, useState } from 'react';
import { CountWrapper } from './styles';

interface Props {
    timer: number
}

let fnTimer: any;
const CountDown:React.FC<Props> = ({timer}) => {
    const [counter, setCounter] = useState(timer);

    useEffect(() => {
        fnTimer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(fnTimer);
    }, [counter]);

    return (
        <CountWrapper>
            <div>Countdown: {counter}</div>
        </CountWrapper>
    );
}

export default CountDown;