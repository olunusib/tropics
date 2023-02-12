import requests
import smtplib
from twilio.rest import Client

#Define the sendmail function
def sendmail(destination_email, country):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login('tropics.auburn@gmail.com', 'uwfpfuvkcgyknput')
    subject = f'Subscription Notice for {country}.'
    body = f'You have successfully suscribed to receive updates about {country}!'
    message = f"Subject:{subject}\n\n{body}"
    server.sendmail('tropics.auburn@gmail.com', destination_email, message)
    print('Email Sent!')
    server.quit()

#Define the send_text function
def send_text():
    client = Client("YourTwilioID", "YourTwilioAuthToken")
    client.messages.create(to="YourPhoneNumber",
                           from_="TwilioNumber",
                           body="You have successfully suscribed to receive updates!")
    print('Text Sent!')