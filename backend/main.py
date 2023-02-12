from flask import Flask
from flask_cors import CORS
import requests
from co2_emissions import emissions
from bs4 import BeautifulSoup
from forest_integrity import integrity_scores
from datetime import datetime, timedelta
import smtplib
from twilio.rest import Client

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
    country_emissions = next(
        item for item in emissions
        if item["country"].lower() == f"{country_name.lower()}")

    print(country_emissions)
    return country_emissions


@api.route('/forestry/<country>')
def forestry(country):
    # get URL
    page = requests.get(
        "https://en.wikipedia.org/wiki/Forest_Landscape_Integrity_Index")

    # scrape webpage
    soup = BeautifulSoup(page.content, 'html.parser')

    # display scraped data
    My_table = soup.find('table')

    images = My_table.find_all('img')

    for i in range(1, len(images), 2):
        src = images[i].get('src')
        if country in src:
            source = 'http:' + src
            return {
                "country": country,
                "score": integrity_scores[country]["Score"],
                "image": source
            }

    return {
        "country":
        country,
        "score":
        5.0,
        "image":
        "https://upload.wikimedia.org/wikipedia/commons/1/11/FLII_Bhutan.png"
    }


#Define the send_text function
@api.route('/subscribe/phone')
def send_text(destination_phone_number, country):
    client = Client("AC8a9e6d8bce518605a1dec43427bf1fab", "29aebe926bb09be5cb5a464cbf75c00e")
    client.messages.create(to=f"{destination_phone_number}",
                           from_="+18559272158",
                           body=f"You have successfully suscribed to receive Tropics🏝️ updates!\n Look forward to receiving mores updates on {country}.")
    print('Text Sent!')
