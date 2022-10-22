import { gsap } from "gsap";
import "../styles/animateStyles.css";

interface TransformClass {
  className: string;
  xPos: number;
  yPos: number;
}

interface DelayClass {
  className: string;
  toDelayTime: number;
}

const TransformClasses: TransformClass[] = [
  {
    className: "gs_reveal_fromTop",
    xPos: 0,
    yPos: -40,
  },
  {
    className: "gs_reveal_fromBottom",
    xPos: 0,
    yPos: 40,
  },
  {
    className: "gs_reveal_fromLeft",
    xPos: -60,
    yPos: 0,
  },
  {
    className: "gs_reveal_fromRight",
    xPos: 60,
    yPos: 0,
  },
];

const DelayClasses: DelayClass[] = [
  {
    className: "delay200",
    toDelayTime: 0.2,
  },
  {
    className: "delay400",
    toDelayTime: 0.4,
  },
  {
    className: "delay600",
    toDelayTime: 0.6,
  },
  {
    className: "delay800",
    toDelayTime: 0.8,
  },
  {
    className: "delay1000",
    toDelayTime: 1.0,
  },
  {
    className: "delay1200",
    toDelayTime: 1.2,
  },
];

export function animateFrom(elem: any) {
  let x: number | undefined,
    y: number | undefined,
    delayTime: number = 0;

  // 페이드인 방향
  // if(elem.classList.contains("gs_reveal_fromTop")) {
  //   x = 0;
  //   y = -40;
  // } else if (elem.classList.contains("gs_reveal_fromBottom")) {
  //   x = 0;
  //   y = 40;
  // } else if(elem.classList.contains("gs_reveal_fromLeft")) {
  //   x = -60;
  //   y = 0;
  // } else if (elem.classList.contains("gs_reveal_fromRight")) {
  //   x = 60;
  //   y = 0;
  // }
  for (const { className, xPos, yPos } of TransformClasses) {
    if (elem.classList.contains(className)) {
      [x, y] = [xPos, yPos];
      break;
    }
  }

  // 지연시간
  // if (elem.classList.contains("delay200")) {
  //   delayTime = 0.2;
  // }

  // if (elem.classList.contains("delay400")) {
  //   delayTime = 0.4;
  // }

  // if (elem.classList.contains("delay600")) {
  //   delayTime = 0.6;
  // }

  // if (elem.classList.contains("delay800")) {
  //   delayTime = 0.8;
  // }

  // if (elem.classList.contains("delay1000")) {
  //   delayTime = 1;
  // }

  // if (elem.classList.contains("delay1200")) {
  //   delayTime = 1.2;
  // }
  for (const { className, toDelayTime } of DelayClasses) {
    if (elem.classList.contains(className)) {
      delayTime = toDelayTime;
      break;
    }
  }

  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 2,
      delay: delayTime,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      // overwrite: "auto"
    }
  );
}

export function hide(elem: any) {
  let x, y;

  // if (elem.classList.contains("gs_reveal_fromTop")) {
  //   x = 0;
  //   y = -40;
  // } else if (elem.classList.contains("gs_reveal_fromBottom")) {
  //   x = 0;
  //   y = 40;
  // } else if (elem.classList.contains("gs_reveal_fromLeft")) {
  //   x = -60;
  //   y = 0;
  // } else if (elem.classList.contains("gs_reveal_fromRight")) {
  //   x = 60;
  //   y = 0;
  // }
  for (const { className, xPos, yPos } of TransformClasses) {
    if (elem.classList.contains(className)) {
      [x, y] = [xPos, yPos];
      break;
    }
  }

  gsap.set(elem, { autoAlpha: 0, x: x, y: y });
}
