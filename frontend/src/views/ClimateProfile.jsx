import React, { useState } from 'react';
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

    const { weatherData, carbonData, forestryData: { final, image_src } } = props;

    return (
        <div className={CSS.grid}>
            <ChartContainerWeather title={"Daily Weather Conditions"} data={weatherData} xAxis={"days"} yAxis={"value"} />
            <ChartContainerCarbon title={"Relative Carbon Emissions"} data={carbonData} />
            <ChartContainerForestry title={"Relative Forest Integrity"} data={final} />
            <ChartContainerForestryImage title={"Forestry Image"} image_src={image_src} />
        </div>
    );
};

const SubscribeForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http:localhost:5000/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, email }),
            });

            if (!response.ok) {
                throw new Error('Failed to subscribe');
                setError(true);
            }

            setSubscribed(true);
        } catch (error) {
            setError(true);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={CSS.subscribe_form}>
            <input
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="phone number..."
                className={CSS.subscribe_form_input}
            />
            <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email..."
                className={CSS.subscribe_form_input}
            />
            <button type="submit" className={CSS.subscribe_form_button}>Subscribe</button>
            {subscribed && <div className={CSS.subscribe_form_message}>You have successfully subscribed!</div>}
            {error && <div className={CSS.subscribe_form_message_fail}>There was a problem processing your request.</div>}
        </form>
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
                    <div className={CSS.recommendationBlock}>
                    <p> {`Inights - ${name}`} </p>
                    </div>

                    <div className={CSS.subscribeContainer}>
                        <div className={CSS.subscribePrompt}>
                            <p>{`Do you wish to subscribe to receive updates about changes to ${name}'s data?`}</p>
                        </div>
                        <div className={CSS.subscribeForm}>
                        <SubscribeForm />
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default ClimateProfile;

