import React, { useState, useEffect } from 'react';
import RevenueInsightService from '../../../services/RevenueInsightService';

export default function Table() {

	const [countOfCustomer1, setCountOfCustomer1] = useState(0);
	const [countOfCustomer2, setCountOfCustomer2] = useState(0);
	const [countOfARR1, setCountOfARR1] = useState(0);
	const [countOfARR2, setCountOfARR2] = useState(0);

	useEffect(() => {
		RevenueInsightService.getSummaryData('2020-03-31', 'monthly')
			.then(res => {
				console.log(res.data.countOfCustomer[0].countOfCustomer);
				setCountOfCustomer1(res.data.countOfCustomer[0].countOfCustomer);
				setCountOfCustomer2(res.data.countOfCustomer[1].countOfCustomer);
				// setCountOfARR1(`${Number((res.data.countOfARR[0].countOfARR / 1000000).toFixed(1))}M`);
				setCountOfARR1(res.data.countOfARR[0].countOfARR);
				// setCountOfARR2(`${Number((res.data.countOfARR[1].countOfARR / 1000000).toFixed(1))}M`);
				setCountOfARR2(res.data.countOfARR[1].countOfARR);
			})
			.catch(err => {
				console.log('Error:', err);
			})
	}, [])

	return (
		// tableInfo-wrapper
		// tableFixHead
		<div className="tableInfo-wrapper">
			{/* tableInfo-body */}
			<div className="tableFixHead">
				<table className="">
					<thead class="headerSticky">
						<tr>
							<th>Metric</th>
							<th>As of 3/31/2020</th>
							<th>As of 12/31/2019</th>
							<th>Change</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Customers</td>
							<td>{countOfCustomer1}</td>
							<td>{countOfCustomer2}</td>
							<td>{Math.round((countOfCustomer1 - countOfCustomer2) / countOfCustomer2*100)}%</td>
						</tr>
						<tr>
							<td>ARR</td>
							<td>${Number((countOfARR1 / 1000000).toFixed(1))}M</td>
							<td>${Number((countOfARR2 / 1000000).toFixed(1))}M</td>
							<td>{Math.round((countOfARR1 - countOfARR2) / countOfARR2*100)}%</td>
						</tr>
						<tr className="tableInfo-body--head">
							<th>Segment: Enterprise</th>
							<th />
							<th />
							<th />
						</tr>
						<tr>
							<td>Net Revenue Retention</td>
							<td>93%</td>
							<td>89%</td>
							<td>21.8%</td>
						</tr>
						<tr>
							<td>Logo Rentention Rate</td>
							<td>$6.7M</td>
							<td>$6.5M</td>
							<td>21.8%</td>
						</tr>
						<tr>
							<td>ACV</td>
							<td>$259,000</td>
							<td>$259,000</td>
							<td>21.8%</td>
						</tr>
						<tr className="tableInfo-body--head">
							<th>Segment: Enterprise</th>
							<th />
							<th />
							<th />
						</tr>
						<tr>
							<td>Net Revenue Retention</td>
							<td>93%</td>
							<td>89%</td>
							<td>21.8%</td>
						</tr>
						<tr>
							<td>Logo Rentention Rate</td>
							<td>$6.7M</td>
							<td>$6.5M</td>
							<td>21.8%</td>
						</tr>
						<tr>
							<td>ACV</td>
							<td>$259,000</td>
							<td>$259,000</td>
							<td>21.8%</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}