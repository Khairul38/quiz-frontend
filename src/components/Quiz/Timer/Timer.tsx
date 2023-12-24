import React, { useEffect, useRef, useState } from "react";

const Timer = (props: any) => {
  const [time, setTime] = useState({ hour: "0", minute: "0", second: "0" });

  let intervalRef = useRef();

  const setTimer = () => {
    var countDownDate = new Date(Date.now());
    countDownDate.setHours(
      countDownDate.getHours() + Math.floor(props.timeInMinute / 60)
    );
    countDownDate.setMinutes(
      countDownDate.getMinutes() + Math.floor(props.timeInMinute % 60)
    );
    // @ts-ignore
    intervalRef = setInterval(() => {
      const now = new Date().getTime();
      // @ts-ignore
      const distance = countDownDate - now;
      const hour = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        // @ts-ignore
        clearInterval(intervalRef);
      } else {
        setTime({
          // @ts-ignore
          hour: hour,
          // @ts-ignore
          minute: minute,
          // @ts-ignore
          second: second,
        });
      }
    }, 1000);
  };
  useEffect(() => {
    setTimer();
  }, []);
  return (
    <p className="py-2 px-3 text-center">
      {`Time: ${time?.hour} : ${time?.minute} : ${time?.second}`}
    </p>
  );
};

export default Timer;
