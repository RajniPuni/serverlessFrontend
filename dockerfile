FROM python:3
COPY ./app.py ./
COPY ./requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 8080

CMD [ "python", "app.py"]
