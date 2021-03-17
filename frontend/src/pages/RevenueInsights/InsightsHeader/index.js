import React, { useState } from "react";
import StatCard from "../../Dashboard/StatCard";
import RevenueInsightService from '../../../services/RevenueInsightService';

const data = {
    annualRecurringRevenue: 23400000,
    annualRecurringRevenuePrev: 22493048,
    customers: 24,
    customersPrev: 28,
    netRevenueRetention: 107,
    netRevenueRetentionPrev: 92,
    logoRetentionRate: 26,
    logoRetentionRatePrev: 22
};

const InsightsHeader = () => {
    const [ARR, setARR] = useState(0);
    const [prevARR, setPrevARR] = useState(0);

    RevenueInsightService.getCardData()
        .then((res) => {
            console.log(res.data.prevARR[0].ARR);
            setARR(res.data.ARR[0].ARR);
            setPrevARR(res.data.prevARR[0].ARR);
        })
        .catch((err) => {
            console.log('Error:', err);
        });

    return (
        <div className="revenue-insights__statsGrid">
            <StatCard
                title="Annual Recurring Revenue (ARR)"
                main={ARR}
                reduceToMillion={true}
                bottom={prevARR}
                unit="dollar"
                grid={1}
            />
            <StatCard
                title="Customers"
                main={data.customers}
                bottom={data.customersPrev}
                grid={2}
            />
            <StatCard
                title="Net Revenue Retention (NRR)"
                main={data.netRevenueRetention}
                bottom={data.netRevenueRetentionPrev}
                unit="percentage"
                grid={3}
            />
            <StatCard
                title="Logo Retention Rate (LRR)"
                main={data.logoRetentionRate}
                bottom={data.logoRetentionRatePrev}
                unit="percentage"
                grid={4}
            />
        </div>
    );

};

export default InsightsHeader;