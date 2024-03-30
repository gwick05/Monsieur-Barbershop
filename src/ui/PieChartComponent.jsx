import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PieChartComponent({ data, label }) {
  const COLORS = data.map((servizio) => servizio.colore);

  return (
    <div className="flex h-full w-full flex-col">
      <h2 className="w-full px-4 py-2">{label}</h2>
      <div className="flex h-full w-full items-center justify-center gap-8  ">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx={140}
            cy={140}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={140}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              );
            })}
          </Pie>
        </PieChart>
        <ul className="flex list-disc flex-col text-left">
          {data.map((value, i) => (
            <li style={{ color: `${COLORS[i]}` }} key={value.name}>
              {value.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PieChartComponent;
