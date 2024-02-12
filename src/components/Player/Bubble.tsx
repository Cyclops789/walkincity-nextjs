import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

function Bubble({ id, onAnimationEnd, icon, color }: { id: string | number, onAnimationEnd: any, icon: IconDefinition, color: string }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(1);
    const opacityDuration = 2;

    const random = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    }

    const size = useRef(random(0.7, 1.5));

    const element = useRef();

    const initialOptions = useRef({
        animationDuration: random(2, 5),
        element,
        onAnimationEnd,
        id
    });

    useEffect(() => {
        const {
            animationDuration,
            element,
            onAnimationEnd,
            id
        } = initialOptions.current;

        // @ts-ignore this is valid
        element.current.addEventListener("transitionend", (event) => {
            if (event.propertyName === "opacity") {
                onAnimationEnd(id);
            }
        });

        setTimeout(() => {
            setPosition((prevState) => ({
                ...prevState,
                x: random(-40, 40),
                y: random(-100, -200)
            }));
        }, 5);

        setTimeout(() => {
            setOpacity(0);
        }, (animationDuration - opacityDuration) * 1000);
    }, []);

    return (
        <div
            style={{
                color,
                fontSize: "2em",
                opacity,
                pointerEvents: "none",
                position: "absolute",
                transform: `translate(calc(-50% + ${position.x}px), calc(-100% + ${position.y}px)) scale(${size.current})`,
                textShadow: "0 0 5px rgba(0, 0, 0, .25)",
                transition: `transform ${initialOptions.current.animationDuration}s linear, opacity ${opacityDuration}s ease-in-out`,
                zIndex: 20
            }}
            // @ts-ignore this is valid
            ref={element}
        >
            <FontAwesomeIcon className='w-[40px]' icon={icon} />
        </div>
    );
}

export default Bubble;