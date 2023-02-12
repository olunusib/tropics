import React from 'react';
import CSS from './ClimateProfile.module.css'
import { useParams } from "react-router-dom";
import LineChart from '../components/Chart/AnalyticsChart';
import { useAxiosGet } from './hooks';
import { convertToNivoFormat } from './utils'


const ChartContainer = (props) => {

    const { title, data, xAxis, yAxis } = props;

    return (
        <div className={CSS.container}>
            <div className={CSS.chartHeader}>
                <p>{title}</p>
            </div>
            <div className={CSS.chartBody}>
                <LineChart data={data} xAxis={xAxis} yAxis={yAxis}/>
            </div>
        </div>
    );
};

const Charts = ({ data }) => {
    return (
        <div className={CSS.grid}>
            <ChartContainer title={"Daily Weather Conditions"} data={data} xAxis={"days"} yAxis={"value"}/>
            <ChartContainer title={"Daily Weather Conditions"} data={data} />
            <ChartContainer title={"Daily Weather Conditions"} data={data} />
            <ChartContainer title={"Daily Weather Conditions"} data={data} />
        </div>
    );
};

const ClimateProfile = (props) => {

    const { name } = useParams();

    const { data, loaded } = useAxiosGet(name);

    return (
        <React.Fragment>
            {!loaded ? (
                <p>Loading ...</p>
            ) : (
                <div className={CSS.dashboard}>
                    <p>{`Climate profile for ${name}`}</p>
                    <Charts data={convertToNivoFormat(data)} />
                </div>
            )}
        </React.Fragment>
    )
}

export default ClimateProfile;

