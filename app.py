import boto3
from flask import Flask
from flask_cors import CORS
from googleapiclient.discovery import build
from google.oauth2 import service_account
import json
# import os
# from dotenv import load_dotenv

# load_dotenv()


app = Flask(__name__)
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

region_name = "us-east-1"
# aws_access_key_id=os.environ['aws_access_key_id']
# aws_secret_access_key=os.environ['aws_secret_access_key']
# aws_session_token=os.environ['aws_session_token']

aws_access_key_id='ASIAYYPQYHOVKK2KZHDC'
aws_secret_access_key='Z2I0GrxK+5FvBZZeUfQRW+kDu/zpBmbyEDXBPA52'
aws_session_token='FwoGZXIvYXdzEDkaDAK1HowZPp34LZ3bGSK/AYx/oO8yXt5jhb45yIwG76QNNI8MhApnE8mmSfGpvM9SQCM1TWdySC7N1QgAzQmELgwctuRQe+iQK80jh4vS594y/PpgTeeT5PffOGEdLu3fvKBOlZoyC3PguFnPxSmnS5A7qSbozA4KDycJniwAAxTDabq76hkOBnBiU03TZ/AGkf9VQO2d1osTz5QjSQiV8Ck2i9EVJViwmfKG44pGBzpJuO6jznc5jYuTTBRJgson1PMal4bBAWGKQL18CA8lKJ+R9ocGMi3UcTNk8EEsLCbBOuBCE84G0Tny5EhzHuMOt09TGZCsakglFLZy3B/qTykgzeo='


#GCP SPREADSHEET API
SERVICE_ACCOUNT_FILE = 'credentials.json'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
creds = None
creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
SAMPLE_SPREADSHEET_ID = '1si8OAmEZG4HBJHiTGMtZ4eYBC3akOzuU6PlaK4Zqjm0'
service = build('sheets', 'v4', credentials=creds)
sheet = service.spreadsheets()


@app.route('/test')
def testping():
    return "Hello world"

comprehend = boto3.client('comprehend', region_name=region_name, aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key, aws_session_token=aws_session_token)

stopwords = ["able", "about", "above", "abroad", "according", "accordingly", "across", "actually", "adj", "after", "afterwards", "again", "against", "ago", "ahead", "ain't", "all", "allow", "allows", "almost", "alone", "along", "alongside", "already", "also", "although", "always", "am", "amid", "amidst", "among", "amongst", "an", "and", "another", "any", "good", "real", "anybody", "anyhow", "anyone", "anything", "anyway", "anyways", "anywhere", "apart", "appear", "appreciate", "appropriate", "are", "aren't", "around", "as", "a's", "aside", "ask", "asking", "associated", "at", "available", "away", "awfully", "back", "backward", "backwards", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "behind", "being", "believe", "below", "beside", "besides", "best", "better", "between", "beyond", "both", "brief", "but", "by", "came", "can", "cannot", "cant", "can't", "caption", "cause", "causes", "certain", "certainly", "changes", "clearly", "c'mon", "co", "co.", "com", "come", "comes", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "corresponding", "could", "couldn't", "course", "c's", "currently", "dare", "daren't", "definitely", "described", "despite", "did", "didn't", "different", "directly", "do", "does", "doesn't", "doing", "done", "don't", "down", "downwards", "during", "each", "edu", "eg", "eight", "eighty", "either", "else", "elsewhere", "end", "ending", "enough", "entirely", "especially", "et", "etc", "even", "ever", "evermore", "every", "everybody", "everyone",
                   "everything", "everywhere", "ex", "exactly", "example", "except", "fairly", "far", "farther", "few", "fewer", "fifth", "first", "five", "followed", "following", "follows", "for", "forever", "former","formerly", "forth", "forward", "found", "four", "from", "further", "furthermore", "get", "gets","getting", "given", "gives", "go", "goes", "going", "gone", "got", "gotten", "greetings", "had","hadn't", "half", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "he'd","he'll", "hello", "help", "hence", "her", "here", "hereafter", "hereby", "herein", "here's","hereupon", "hers", "herself", "he's", "hi", "him", "himself", "his", "hither", "hopefully", "how","howbeit", "however", "hundred", "i'd", "ie", "if", "ignored", "i'll", "i'm", "immediate", "in","inasmuch", "inc", "inc.", "indeed", "indicate", "indicated", "indicates", "inner", "inside","insofar", "instead", "into", "inward", "is", "isn't", "it", "it'd", "it'll", "its", "it's","itself", "i've", "just", "k", "keep", "keeps", "kept", "know", "known", "knows", "last", "lately","later", "latter", "latterly", "least", "less", "lest", "let", "let's", "like", "liked", "likely","likewise", "little", "look", "looking", "looks", "low", "lower", "ltd", "made", "mainly", "make","makes", "many", "may", "maybe", "mayn't", "me", "mean", "meantime", "meanwhile", "merely", "might","mightn't", "mine", "minus", "miss", "more", "moreover", "most", "mostly", "mr", "mrs", "much",
                   "must", "mustn't", "my", "myself", "name", "namely", "nd", "near", "nearly", "necessary", "need",
                   "needn't", "needs", "neither", "never", "neverf", "neverless", "nevertheless", "new", "next", "nine",
                   "ninety", "no", "nobody", "non", "none", "nonetheless", "noone", "no-one", "nor", "normally", "not",
                   "nothing", "notwithstanding", "novel", "now", "nowhere", "obviously", "of", "off", "often", "oh",
                   "ok", "okay", "old", "on", "once", "one", "ones", "one's", "only", "onto", "opposite", "or", "other",
                   "others", "otherwise", "ought", "oughtn't", "our", "ours", "ourselves", "out", "outside", "over",
                   "overall", "own", "particular", "particularly", "past", "per", "perhaps", "placed", "please", "plus",
                   "possible", "presumably", "probably", "provided", "provides", "que", "quite", "qv", "rather", "rd",
                   "re", "really", "reasonably", "recent", "recently", "regarding", "regardless", "regards",
                   "relatively", "respectively", "right", "round", "said", "same", "saw", "say", "saying", "says",
                   "second", "secondly", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self",
                   "selves", "sensible", "sent", "serious", "seriously", "seven", "several", "shall", "shan't", "she",
                   "she'd", "she'll", "she's", "should", "shouldn't", "since", "six", "so", "some", "somebody",
                   "someday", "somehow", "someone", "something", "sometime", "sometimes", "somewhat", "somewhere",
                   "soon", "sorry", "specified", "specify", "specifying", "still", "sub", "such", "sup", "sure", "take",
                   "taken", "taking", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that'll",
                   "thats", "that's", "that've", "the", "their", "theirs", "them", "themselves", "then", "thence",
                   "there", "thereafter", "thereby", "there'd", "therefore", "therein", "there'll", "there're",
                   "theres", "there's", "thereupon", "there've", "these", "they", "they'd", "they'll", "they're",
                   "they've", "thing", "things", "think", "third", "thirty", "this", "thorough", "thoroughly", "those",
                   "though", "three", "through", "throughout", "thru", "thus", "till", "to", "together", "too", "took",
                   "toward", "towards", "tried", "tries", "truly", "try", "trying", "t's", "twice", "two", "un",
                   "under", "underneath", "undoing", "unfortunately", "unless", "unlike", "unlikely", "until", "unto",
                   "up", "upon", "upwards", "us", "use", "used", "useful", "uses", "using", "usually", "v", "value",
                   "various", "versus", "very", "via", "viz", "vs", "want", "wants", "was", "wasn't", "way", "we",
                   "we'd", "welcome", "well", "we'll", "went", "were", "we're", "weren't", "we've", "what", "whatever", 
                   "what'll", "what's", "what've", "when", "whence", "whenever", "where", "whereafter", "whereas",
                   "whereby", "wherein", "where's", "whereupon", "wherever", "whether", "which", "whichever", "while",
                   "whilst", "whither", "who", "who'd", "whoever", "whole", "who'll", "whom", "whomever", "who's",
                   "whose", "why", "will", "willing", "wish", "with", "within", "without", "wonder", "won't", "would",
                   "wouldn't", "yes", "yet", "you", "you'd", "you'll", "your", "you're", "yours", "yourself",
                   "yourselves", "you've", "zero", "a", "how's", "i", "when's", "why's", "I", "www", "amount", "bill",
                   "bottom", "call", "computer", "con", "couldnt", "cry", "de", "describe", "detail", "due", "eleven",
                   "empty", "fifteen", "fifty", "fill", "find", "fire", "forty", "front", "full", "give", "hasnt",
                   "herse", "himse", "interest", "mill", "move", "part", "put", "show", "side", "sincere", "sixty",
                   "system", "ten", "thick", "thin", "top", "twelve", "twenty", "abst", "accordance", "act", "added",
                   "adopted", "affected", "affecting", "affects", "ah", "announce", "anymore", "apparently",
                   "approximately", "aren", "arent", "arise", "auth", "beginning", "beginnings", "begins", "biol",
                   "briefly", "ca", "date", "ed", "effect", "et-al", "ff", "fix", "gave", "giving", "heres", "hes",
                   "hid", "home", "id", "im", "immediately", "importance", "important", "index", "information",
                   "invention", "itd", "keys", "kg", "km", "largely", "lets", "line", "means", "mg", "million", "ml",
                   "mug", "na", "nay", "necessarily", "nos", "noted", "obtain", "obtained", "omitted", "ord", "owing",
                   "page", "pages", "poorly", "possibly", "potentially", "pp", "predominantly", "present", "previously",
                   "primarily", "promptly", "proud", "quickly", "ran", "readily", "ref", "refs", "related", "research",
                   "resulted", "resulting", "results", "run", "sec", "section", "shed", "shes", "showed", "shown",
                   "showns", "shows", "significant", "significantly", "similar", "similarly", "slightly", "somethan",
                   "specifically", "state", "states", "stop", "strongly", "substantially", "successfully",
                   "sufficiently", "suggest", "thered", "thereof", "therere", "thereto", "theyd", "theyre", "thou",
                   "thoughh", "thousand", "throug", "til", "tip", "ts", "ups", "usefully", "usefulness", "vol", "vols",
                   "wed", "whats", "wheres", "whim", "whod", "whos", "widely", "words", "world", "youd", "youre"]
selectedentities = {}
data = []

def returningJson(data):
    returnData = []
    for var in data.keys():
        obj = dict()
        obj["text"] = var
        obj["value"] = data[var]
        returnData.append(obj)
    return returnData


@app.route('/createReactWordCloud')
def createWordCloud():
    importData()
    json_object = returningJson(selectedentities)
    
    test = json.dumps(selectedentities)
    
    jsonObject = json.loads(test)
    
    # print the keys and values
    for key in jsonObject:
        value = jsonObject[key]
        arr = []
        arr.append(key)
        arr.append(value)
        data.append(arr)
        print(arr)

    response = sheet.values().clear(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                            range="Sheet1!A1:C").execute()

    response1 = sheet.values().append(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range="Sheet1!A1:C", valueInputOption="USER_ENTERED", 
                                insertDataOption="INSERT_ROWS", body={"values":data}).execute()
    print(data)
    return "data"
    
def importData():    
    dynamo = boto3.resource('dynamodb', region_name=region_name, aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key, aws_session_token=aws_session_token)

    tableRatingData = dynamo.Table('ratingsData')
    ratingData = tableRatingData.scan() 
    print(ratingData)
    for i in range(0,len(ratingData['Items'])-1):
        rating = ratingData['Items'][i]["ratings"]
        processRatings(rating)

def processRatings(rating):
    # print(rating)
    # processRatingJson = json.loads(json.dumps(comprehend.detect_key_phrases(Text=rating, LanguageCode='en')))
    # print(processRatingJson['KeyPhrases'])
    # return processRatingJson['KeyPhrases'][0]['Text']
    # rating = "Preheat a Waffle Pizza Burger iron according to Donut manufacturer's instructions. Whisk flour, cornmeal, sugar, baking powder, baking soda, and salt together in a large mixing bowl. Whisk half-and-half, ricotta cheese, eggs, melted butter, and lemon extract together in a separate bowl until smooth. Pour into the flour mixture and mix until thoroughly combined."
    
    for currentword in rating.split():
        currentword = currentword.strip(',').strip('.').replace("-","")
        
        if len(currentword) != 0 and currentword[0].isupper() and not stopwords.__contains__(currentword.lower()) and not currentword.__contains__('''"'''):
            if currentword in selectedentities:
                count = selectedentities[currentword]
                selectedentities[currentword] = count + 1
            else:
                selectedentities[currentword] = 1


if __name__ == "__main__":
    app.run()
