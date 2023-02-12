import React from 'react';
import CSS from './ClimateProfile.module.css'
import { useParams } from "react-router-dom";
import LineChart from '../components/Chart/AnalyticsChart';
import PieChart from '../components/Chart/AnalyticsPieChart';
import { useAxiosGetForWeather, useAxiosGetForCarbon } from './hooks';
import { convertToNivoFormatWeather, convertToNivoFormatCarbon } from './utils'


const ChartContainerWeather = (props) => {

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

const ChartContainerCarbon = (props) => {

    const { title, data } = props;

    return (
        <div className={CSS.container}>
            <div className={CSS.chartHeader}>
                <p>{title}</p>
            </div>
            <div className={CSS.chartBody}>
                <PieChart data={data} />
            </div>
        </div>
    );
};

const Charts = (props) => {

    const {weatherData, carbonData} = props;

    return (
        <div className={CSS.grid}>
            <ChartContainerWeather title={"Daily Weather Conditions"} data={weatherData} xAxis={"days"} yAxis={"value"}/>
            <ChartContainerCarbon title={"Relative Carbon Emissions"} data={carbonData} />
            <ChartContainerWeather title={"Daily Weather Conditions"} data={weatherData}  xAxis={"days"} yAxis={"value"}/>
            <ChartContainerWeather title={"Daily Weather Conditions"} data={weatherData} xAxis={"days"} yAxis={"value"}/>
        </div>
    );
};

const ClimateProfile = (props) => {

    const { name } = useParams();

    const { weatherData, weatherLoaded } = useAxiosGetForWeather(name);
    const { carbonData, carbonLoaded } = useAxiosGetForCarbon(name);

    return (
        <React.Fragment>
            {!(weatherLoaded && carbonLoaded) ? (
                <p>Loading ...</p>
            ) : (
                <div className={CSS.dashboard}>
                    <p>{`Climate profile for ${name}`}</p>
                    <Charts weatherData={convertToNivoFormatWeather(weatherData)} carbonData={convertToNivoFormatCarbon(carbonData)} />
                </div>
            )}
        </React.Fragment>
    )
}

export default ClimateProfile;

