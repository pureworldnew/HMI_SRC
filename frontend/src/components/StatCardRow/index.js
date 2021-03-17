import React from 'react'
import StatCard from "../StatCard";

const StatCardRow = ({ data, ...props }) => {
	// const { annualRecurringRevenue, annualRecurringRevenuePrev,
	// 	customers, customersPrev, netRevenueRetention, netRevenueRetentionPrev,
	// 	logoRetentionRate, logoRetentionRatePrev} = data;
	return (
		<div className="revenue-insights__statsGrid">
			{props.children}
			{/*<StatCard*/}
			{/*	title="Annual Recurring Revenue (ARR)"*/}
			{/*	main={annualRecurringRevenue}*/}
			{/*	reduceToMillion={true}*/}
			{/*	bottom={annualRecurringRevenuePrev}*/}
			{/*	unit="dollar"*/}
			{/*	grid={1}*/}
			{/*/>*/}
			{/*<StatCard*/}
			{/*	title="Customers"*/}
			{/*	main={customers}*/}
			{/*	bottom={customersPrev}*/}
			{/*	grid={2}*/}
			{/*/>*/}
			{/*<StatCard*/}
			{/*	title="Net Revenue Retention (NRR)"*/}
			{/*	main={netRevenueRetention}*/}
			{/*	bottom={netRevenueRetentionPrev}*/}
			{/*	unit="percentage"*/}
			{/*	grid={3}*/}
			{/*/>*/}
			{/*<StatCard*/}
			{/*	title="Logo Retention Rate (LRR)"*/}
			{/*	main={logoRetentionRate}*/}
			{/*	bottom={logoRetentionRatePrev}*/}
			{/*	unit="percentage"*/}
			{/*	grid={4}*/}
			{/*/>*/}
		</div>
	)
}

export default StatCardRow