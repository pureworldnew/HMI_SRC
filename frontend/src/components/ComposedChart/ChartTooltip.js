import React from 'react';
/*
color: "#EB367E"
dataKey: "churn_arr"
fill: "#fff"
formatter: undefined
name: "churn_arr"
payload:
  churn: 21
  churn_arr: 75
  period: "Q4 2019"
  recurring_revenue: 175
  __proto__: Object
    stroke: "#EB367E"
    strokeWidth: 3
    type: undefined
    unit: undefined
    value: 75

   */

export default function CustomTooltip(props) {
  const { active } = props;
  const itemStyles = {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '20px',
    marginBottom: '20px'
  };
  const itemFlex = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  };
  if (active) {
    const { label, payload } = props;
    return (
      <div
        style={{
          padding: '16px 24px 1px 24px',
          backgroundColor: '#1E2C36',
          borderRadius: '8px',
          width: '215px'
        }}>
        <h5 style={{ textAlign: 'center', ...itemStyles }}>{label}</h5>
        <div style={itemFlex}>
          <div
            style={{
              width: '20px',
              height: '20px',
              marginRight: '12px',
              borderRadius: '4px',
              display: 'block',
              background: payload[0].color
            }}
          />
          <div style={itemStyles}>
            Recurring Revenue <br />= ${payload[0].payload.recurring_revenue}
          </div>
        </div>
        <div style={itemFlex}>
          <span
            style={{
              width: '20px',
              height: '20px',
              marginRight: '12px',
              borderRadius: '4px',
              display: 'block',
              background: payload[1].color
            }}
          />
          <div style={itemStyles}>
            Churn
            <br />= ${payload[0].payload.churn}
          </div>
        </div>
        <div style={itemFlex}>
          <span
            style={{
              width: '20px',
              height: '20px',
              marginRight: '12px',
              borderRadius: '4px',
              display: 'block',
              background: payload[2].color
            }}
          />
          <div style={itemStyles}>
            Churn as % of ARR
            <br />= {payload[0].payload.churn_arr}%
          </div>
        </div>
      </div>
    );
  }
  return null;
}
