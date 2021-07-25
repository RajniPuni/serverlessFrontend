from googleapiclient.discovery import build
from google.oauth2 import service_account

SERVICE_ACCOUNT_FILE = 'credentials.json'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

creds = None
creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
SAMPLE_SPREADSHEET_ID = '1si8OAmEZG4HBJHiTGMtZ4eYBC3akOzuU6PlaK4Zqjm0'

service = build('sheets', 'v4', credentials=creds)

sheet = service.spreadsheets()
response = sheet.values().clear(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                            range="Sheet1!A1:C").execute()

data = [["test","test"]]
response1 = sheet.values().append(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                            range="Sheet1!A1:C", valueInputOption="USER_ENTERED", 
                            insertDataOption="INSERT_ROWS", body={"values":data}).execute()

print(response)