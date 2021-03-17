import React from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';

export default function PieChartСustom({ data, title, ...props }) {
  const colors = ['#1C5DE1', '#3CD278', '#7747E3', '#F89672', '#F7D68A'];
  const labels = [
    'Low Usage',
    'Too Small',
    'Pricing',
    'Medium Usage',
    'High Usage'
  ];
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {props.children}
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '60%' }}>
          <PieChart width={310} height={310}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={310 / 2}
              fill="#8884d8">
              {data.map((key, index) => (
                <Cell fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#1E2C36',
                borderRadius: '8px',
                border: 'none',

              }}
              itemStyle={{
                fontWeight: 'bold',
                fontSize: '14px',
                lineHeight: '20px',
                color: '#FFFFFF',
                padding: '16px 24px'
              }}
            />
          </PieChart>
        </div>
        <div style={{ width: '40%' }}>
          <ul
            style={{
              listStyleType: 'none',
              height: 'calc(100% - 20px)',
              paddingLeft: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
            {labels.map((key, index) => {
              return (
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      display: 'block',
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      background: colors[index],
                      marginRight: '12px'
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 'bold',
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '0.01em',
                      color: '#1E2C36'
                    }}>
                    {key}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
