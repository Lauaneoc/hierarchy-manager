import { useRef, useState, useEffect } from 'react';
import { LinePath } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';
import { timeFormat } from 'd3-time-format';

const timeFormatter = timeFormat('%H:%M');

interface DataPoint {
  time: Date; 
  value: number;
}

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface LineChartProps {
  data: DataPoint[];
  margin?: Margin;
  width: number;
  height: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  margin = { top: 20, right: 30, bottom: 50, left: 50 },
  width,
}) => {

  const divRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || !entries.length) return;
      const { width } = entries[0].contentRect;
      const height = width / 2;
      setDimensions({ width, height });
    });

    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        resizeObserver.unobserve(divRef.current);
      }
    };
  }, []);

  if (!data || data.length === 0) return <p>No data provided</p>;

  const { width: svgWidth, height } = dimensions;

  const xScale = scaleTime({
    domain: [data[0].time, data[data.length - 1].time],
    range: [margin.left, svgWidth - margin.right],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.value))],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <div ref={divRef} style={{ width: `${width}`, height: 'auto' }}>
      <svg width={svgWidth} height={height}>
        <Group>
          <AxisLeft scale={yScale} left={margin.left} />
          <AxisBottom
            scale={xScale}
            top={height - margin.bottom}
            tickFormat={(value) => {
              if (value instanceof Date) {
                return timeFormatter(value);
              }
              return '';
            }}
          />

          {/* Caminho da linha */}
          <LinePath
            data={data}
            x={(d) => xScale(d.time) as number}
            y={(d) => yScale(d.value) as number}
            stroke="blue"
            strokeWidth={2}
            curve={curveMonotoneX}
          />
        </Group>
      </svg>
    </div>
  );
};

export default LineChart;
