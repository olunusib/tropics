import React from 'react';
import CSS from './ClimateProfile.module.css'
import { useParams } from "react-router-dom";
import LineChart from '../components/Chart/AnalyticsChart';
import PieChart from '../components/Chart/AnalyticsPieChart';
import { useAxiosGetForWeather, useAxiosGetForCarbon, useAxiosGetForForestry } from './hooks';
import { convertToNivoFormatWeather, convertToNivoFormatCarbon, convertToNivoFormatForestry } from './utils'


const ChartContainerWeather = (props) => {

    const { title, data, xAxis, yAxis } = props;

    return (
        <div className={CSS.container}>
            <div className={CSS.chartHeader}>
                <p>{title}</p>
            </div>
            <div className={CSS.chartBody}>
                <LineChart data={data} xAxis={xAxis} yAxis={yAxis} />
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

const ChartContainerForestry = (props) => {

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

const ChartContainerForestryImage = (props) => {

    const { title, image_src } = props;

    return (
        <div className={CSS.container}>
            <div className={CSS.chartHeader}>
                <p>{title}</p>
            </div>
            <div className={CSS.chartBody}>
                <img src={image_src} className={CSS.forestryPhoto}></img>
            </div>
        </div>
    );
};

const Charts = (props) => {

    const { weatherData, carbonData, forestryData: {final, image_src} } = props;

    return (
        <div className={CSS.grid}>
            <ChartContainerWeather title={"Daily Weather Conditions"} data={weatherData} xAxis={"days"} yAxis={"value"} />
            <ChartContainerCarbon title={"Relative Carbon Emissions"} data={carbonData} />
            <ChartContainerForestry title={"Relative Deforestation"} data={final} />
            <ChartContainerForestryImage title={"Forestry Image"} image_src={image_src} />
        </div>
    );
};

const ClimateProfile = (props) => {

    const { name } = useParams();

    const { weatherData, weatherLoaded } = useAxiosGetForWeather(name);
    const { carbonData, carbonLoaded } = useAxiosGetForCarbon(name);
    const { forestryData, forestryLoaded } = useAxiosGetForForestry(name);

    return (
        <React.Fragment>
            {!(weatherLoaded && carbonLoaded && forestryLoaded) ? (
                <p>Loading ...</p>
            ) : (
                <div className={CSS.dashboard}>
                    <p>{`Climate profile for ${name}`}</p>
                    <Charts weatherData={convertToNivoFormatWeather(weatherData)} carbonData={convertToNivoFormatCarbon(carbonData)} forestryData={convertToNivoFormatForestry(forestryData)} />
                </div>
            )}
        </React.Fragment>
    )
}

export default ClimateProfile;

