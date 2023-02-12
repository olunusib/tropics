from flask import Flask
from flask_cors import CORS
import requests
from co2_emissions import emissions
from datetime import datetime, timedelta

api = Flask(__name__)
CORS(api)

def get_boundingbox_country(country):
    url = '{0}{1}{2}'.format(
        'http://nominatim.openstreetmap.org/search?country=', country,
        '&format=json&polygon=0')

    try:
        response = requests.get(url).json()[0]
        lst = [response.get(key) for key in ['lat', 'lon']]
        output = [float(i) for i in lst]
    except:
        output = [0, 0]

    return output


@api.route('/temperature/<country>')
def my_profile(country):

    lat, lng = get_boundingbox_country(country)

    url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lng}&appid=5278a40f76dd0bf571b929f01a997887"

    headers = {"accept": "application/json", "Accept-Encoding": "gzip"}

    response = requests.get(url, headers=headers)
    mid_temps = {}
    temps = response.json()['list']
    # mock indexes for 5 days
    temps_index = [5, 13, 22, 28, 35]
    for days, index in enumerate(temps_index):
        mid_temps[str(datetime.now() + timedelta(days=days))[:10]] = {
            "temp": temps[index]['main']['feels_like'],
            "sea_level": temps[index]['main']['sea_level'],
            "ground_level": temps[index]['main']['grnd_level'],
            "humidity": temps[index]['main']['humidity']
        }

    return mid_temps


@api.route('/carbon/<country>')
def my_details(country):

    country_name = country
    country_emissions = next(item for item in emissions if item["country"] == f"{country_name.lower()}")
    return country_emissions

