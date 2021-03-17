import React from "react";
import StatCard from "../../Dashboard/StatCard";
import Table from './table';
import InsightsHeader from '../InsightsHeader';

const Summary = () => {
	return (
		<div className="annual-recurring-revenue">
			<InsightsHeader />
			<div className="contentBlock">
				<h3>Revenue Summary</h3>
				<Table />
			</div>
		</div>
	);
};

export default Summary;
