import React, { useRef, useState, useEffect } from 'react';
import { DrawingStroke } from '../types';

interface DrawingCanvasProps {
  tool: 'none' | 'marker' | 'duster';
  markerColor: string;
  markerWidth: number;
  strokes: DrawingStroke[];
  onStrokesChange: (strokes: DrawingStroke[]) => void;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  tool,
  markerColor,
  markerWidth,
  strokes,
  onStrokesChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);

  // Redraw canvas whenever strokes change or canvas resizes
  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = stroke.width;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
      }

      ctx.stroke();
    });

    ctx.globalCompositeOperation = 'source-over';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        redraw();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [strokes]);

  useEffect(() => {
    redraw();
  }, [strokes]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (tool === 'none') return;
    setIsDrawing(true);
    const point = getCanvasCoords(e);
    setCurrentPoints([point]);
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === 'none') return;
    const point = getCanvasCoords(e);
    const newPoints = [...currentPoints, point];
    setCurrentPoints(newPoints);

    // Live preview current stroke on canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    redraw();

    ctx.beginPath();
    ctx.moveTo(newPoints[0].x, newPoints[0].y);
    for (let i = 1; i < newPoints.length; i++) {
      ctx.lineTo(newPoints[i].x, newPoints[i].y);
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'duster') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 36;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = markerColor;
      ctx.lineWidth = markerWidth;
    }
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  };

  const handleEnd = () => {
    if (!isDrawing || tool === 'none') return;
    setIsDrawing(false);

    if (currentPoints.length > 1) {
      const newStroke: DrawingStroke = {
        id: `stroke-${Date.now()}`,
        points: currentPoints,
        color: markerColor,
        width: tool === 'duster' ? 36 : markerWidth,
        isEraser: tool === 'duster'
      };
      onStrokesChange([...strokes, newStroke]);
    }
    setCurrentPoints([]);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      className={`absolute inset-0 z-20 ${
        tool === 'marker'
          ? 'cursor-crosshair'
          : tool === 'duster'
          ? 'cursor-cell'
          : 'pointer-events-none'
      }`}
    />
  );
};
