import React, { useState, useRef, useEffect } from "react";
import {
    Menu, MenuItem, IconButton, List, ListItem,
    ListItemText, Divider, Switch
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { CustomBarChart, CustomBarChartLegend } from '../../../../components/BarChart';
import { ExportToJPG } from '../../../../components/ContextMenu';
import RevenueInsightService from '../../../../services/RevenueInsightService';
import { connect } from 'react-redux';
import revenue_insight from '../../../../store/models/_revenue_insight';
import dashboard_header from '../../../../store/models/_dashboard_header';
import DatePickerPopover from "../../../../components/DatePickerPopover";



const BC = (props) => {
    const containerRef = useRef();
    const data = [
        {
            month: "Jan",
            SMB: 70,
            Mid: 62,
            Enterprise: 0
        },
        {
            month: "Feb",
            SMB: 100,
            Mid: 84,
            Enterprise: 42
        },
        {
            month: "Mar",
            SMB: 130,
            Mid: 125,
            Enterprise: 23
        },
        {
            month: "Apr",
            SMB: 80,
            Mid: 125,
            Enterprise: 40
        },
        {
            month: "May",
            SMB: 220,
            Mid: 67,
            Enterprise: 22
        },
        {
            month: "Jun",
            SMB: 60,
            Mid: 93,
            Enterprise: 50
        },
        {
            month: "Jul",
            SMB: 143,
            Mid: 62,
            Enterprise: 33
        },
        {
            month: "Aug",
            SMB: 120,
            Mid: 104,
            Enterprise: 25
        },
        {
            month: "Sep",
            SMB: 71,
            Mid: 104,
            Enterprise: 23
        },
        {
            month: "Oct",
            SMB: 111,
            Mid: 124,
            Enterprise: 40
        },
        {
            month: "Nov",
            SMB: 117,
            Mid: 58,
            Enterprise: 39
        },
        {
            month: "Dec",
            SMB: 101,
            Mid: 84,
            Enterprise: 20
        }
    ];
    const [chart_data, setChart_data] = useState([]);
    const [stackedBar, setStackedBar] = useState(false)
    useEffect(() => {
        RevenueInsightService.getSegmentData()
            .then(res => {
                // setChart_data(res.data);
                if (props.show_ARR_Segment === true) {
                    if (props.set_insight_arr_segment === null) setChart_data(res.data);
                    else {
                        let new_array = [];
                        res.data.map(element => {
                            let amount = 0;
                            if (props.set_insight_arr_segment === 'SMB') amount = element.SMB;
                            else if (props.set_insight_arr_segment === 'Mid') amount = element.Mid;
                            else if (props.set_insight_arr_segment === 'Enterprise') amount = element.Enterprise;
                            let temp_element = {
                                month: element.month,
                                amount: amount
                            }
                            new_array.push(temp_element);
                        })
                        setChart_data(new_array);
                    }

                }
                else {
                    let new_array = [];
                    res.data.map(element => {
                        let temp_element = {
                            month: element.month,
                            amount: element.SMB + element.Mid + element.Enterprise
                        }
                        new_array.push(temp_element);
                    })
                    setChart_data(new_array);
                }
            })
            .catch(err => {
                console.log('Error:', err);
            })

    }, [props.set_insight_arr_segment, props.show_ARR_Segment]);
    let colorBarStack = ['#333', '#626060', '#777', '#8c8686', '#a79d9d'];
    let [anchorEl, setAnchorEl] = useState(null);
    let [percentage_show, setpercentage_show] = useState();
    useEffect(() => {
        const newData = chart_data.length !== 0 ? Object.keys(chart_data[0]).length < 3 : false
        setStackedBar(newData)
    }, [chart_data])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    // to control component switches
    const [switchStates, setShowCtrl] = useState({
        showTotals: false,
        showSegments: props.show_ARR_Segment
    });
    const handleChange = (event, checked) => {
        setShowCtrl({
            ...switchStates,
            [event.target.id]: checked
        });
        if (event.target.id === 'showSegments') props.updateARRSegmentState(checked);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // TODO: : need to deal with null values
    return (
        <div className="barChartContainer" ref={containerRef} style={{ alignItems: 'flex-start' }}>
            <div className="barChart__header">
                <h3>Annual Recurring Revenue (ARR)</h3>
                <div style={{ display: 'flex' }}>
                    <CustomBarChartLegend colors={colorBarStack} data={chart_data} />

                    <DatePickerPopover
                      value={(data) => console.log(data)}
                    />
                </div>
                <Menu
                    id="chart-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >

                    <List component="nav" className="context-menu" aria-label="secondary mailbox folders">
                        <MenuItem onClick={handleClose}>
                            <ListItemText primary="Export To" />
                        </MenuItem>
                        <ExportToJPG elementToConvert={containerRef} imageName="Annual Recurring Revenue" handleClose={handleClose} />
                        <MenuItem onClick={handleClose}>
                            <ListItemText primary="Excel XLSX" />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemText primary="Google Sheet" />
                        </MenuItem>
                        <Divider />
                        <MenuItem style={{ display: "block" }}>
                            <ListItemText primary="Show Totals on Chart" />
                            <Switch
                                id="showTotals"
                                checked={switchStates.showTotals}
                                onChange={handleChange}
                                color="default"
                                name="show-totals"
                            />
                        </MenuItem>
                        <Divider />
                        <MenuItem style={{ display: "block" }}>
                            <ListItemText primary="Show/Hide Segments" />
                            <Switch
                                id="showSegments"
                                checked={switchStates.showSegments}
                                onChange={handleChange}
                                color="default"
                                name="show-segments"
                            />
                        </MenuItem>
                    </List>

                </Menu>

            </div>
            <div className="barChartWrapper" style={{ width: '100%' }}>
                <CustomBarChart height={370} colors={colorBarStack}
                                data={chart_data}
                                format={{ format: '$', position: 'left',
                    slice: 1, singleBar: stackedBar }}
                                stacked={true} tooltip={true} />
            </div>
        </div>
    );
};

const mapStateToProps = ({ revenue_insight: { show_ARR_Segment }, dashboard_header: { set_insight_arr_segment } }) => ({
    show_ARR_Segment, set_insight_arr_segment
});

const mapDispatchToProps = ({ revenue_insight: { updateARRSegmentState }, dashboard_header: { updateInsightArrSegmentState } }) => ({
    updateARRSegmentState: (value) => updateARRSegmentState(value),
    updateInsightArrSegmentState: (value) => updateInsightArrSegmentState(value),
});

export default connect(mapStateToProps, mapDispatchToProps)(BC);
