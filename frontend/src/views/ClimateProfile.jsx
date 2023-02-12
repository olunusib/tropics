import React from 'react';
import CSS from './ClimateProfile.module.css'
import { useParams } from "react-router-dom";
import LineChart from '../components/Chart/AnalyticsChart';
import { data } from "../components/Chart/data";

const ChartContainer = () => (
    <div className={CSS.container}>
        <div className={CSS.chartHeader}>
            <p>Daily Temperature Rise</p>
        </div>
        <div className={CSS.chartBody}>
        <LineChart data={data}/>
        </div>
    </div>
);

const Charts = () => {
    return (
        <div className={CSS.grid}>
            <ChartContainer>Container 1</ChartContainer>
            <ChartContainer>Container 2</ChartContainer>
            <ChartContainer>Container 3</ChartContainer>
            <ChartContainer>Container 4</ChartContainer>
        </div>
    );
};

const ClimateProfile = (props) => {

    const { name } = useParams();

    return (
        <div className={CSS.dashboard}>
            <p>{`Climate profile for ${name}`}</p>
            <Charts />
        </div>
    )
}

export default ClimateProfile;

