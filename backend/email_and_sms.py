import requests
import smtplib
from twilio.rest import Client
import os

#Define the sendmail function
def sendmail(destination_email, country):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login('tropics.auburn@gmail.com', os.environ("GOOGLE_APP_PASSWORD"))
    subject = f'Subscription Notice for {country}.'
    body = f'You have successfully suscribed to receive updates about {country}!'
    message = f"Subject:{subject}\n\n{body}"
    server.sendmail('tropics.auburn@gmail.com', destination_email, message)
    print('Email Sent!')
    server.quit()

#Define the send_text function
def send_text(destination_phone_number, country):
    client = Client("AC8a9e6d8bce518605a1dec43427bf1fab", os.environ("TWILIO_TOKEN"))
    client.messages.create(to=f"{destination_phone_number}",
                           from_="+18559272158",
                           body=f"You have successfully suscribed to receive Tropics🏝️ updates!\n Look forward to receiving mores updates on {country}.")
    print('Text Sent!')