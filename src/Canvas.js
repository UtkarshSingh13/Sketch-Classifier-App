import React, { useEffect, useRef } from "react";

const Canvas = React.forwardRef((props, ref) => {
  let mouseDown = useRef(false);
  let lastX = useRef();
  let lastY = useRef();

  const drawLine = (canvas, x, y, lastX, lastY) => {
    let context = canvas.getContext("2d");

    context.strokeStyle = "#000000";
    context.lineWidth = 12;
    context.lineJoin = "round";

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();

    return [x, y];
  };

  const handleMouseup = () => {
    mouseDown.current = false;
    [lastX.current, lastY.current] = [undefined, undefined];
  };

  const handleMousemove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mouseDown.current) {
      [lastX.current, lastY.current] = drawLine(e.target, x, y, lastX.current, lastY.current);
    }
  };

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.height, canvas.width);
  }, [ref]);

  return (
    <canvas
      height={400} // Increased height
      width={400}  // Increased width
      ref={ref}
      onMouseDown={() => (mouseDown.current = true)}
      onMouseUp={handleMouseup}
      onMouseMove={handleMousemove}
      style={{
        border: "1px solid black",
        borderRadius: 15,
        backgroundColor: "white",
      }}
    />
  );
});

export { Canvas };
