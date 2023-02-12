from flask import Flask
import requests
from datetime import datetime, timedelta
api = Flask(__name__)

lng , lat =  -71.0466, 42.3478
@api.route('/profile')
def my_profile(lat, lng):

    url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lng}&appid=5278a40f76dd0bf571b929f01a997887"

    headers = {
        "accept": "application/json",
        "Accept-Encoding": "gzip"
    }

    response = requests.get(url, headers=headers)
    mid_temps = {}
    print(len(response.json()['list']))
    temps = response.json()['list']
    temps_index = [5, 13, 22, 28, 35]
    for days, index in enumerate(temps_index):
        mid_temps[datetime.now() + timedelta(days=days)] = {
            "temp":temps[index]['main']['feels_like'],
            "sea_level": temps[index]['main']['sea_level'],
            "ground_level": temps[index]['main']['grnd_level'],
            "humidity": temps[index]['main']['humidity']}
        print("\n\n")
    print(mid_temps)

    return mid_temps

my_profile(lat, lng)


my_profile(lat, lng)