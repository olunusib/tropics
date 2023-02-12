import requests
import smtplib
from twilio.rest import Client

#Define the sendmail function
def sendmail():
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login('youremail@gmail.com', 'yourapppassword')
    subject = 'Subscription Notics!'
    body = 'You have successfully suscribed to receive updates!'
    message = f"Subject:{subject}\n\n{body}"
    server.sendmail('FromThisEmail@gmail.com', 'ToThisEmail@gmail.com', message)
    print('Email Sent!')
    server.quit()

#Define the send_text function
def send_text():
    client = Client("YourTwilioID", "YourTwilioAuthToken")
    client.messages.create(to="YourPhoneNumber",
                           from_="TwilioNumber",
                           body="You have successfully suscribed to receive updates!")
    print('Text Sent!')