FROM python:3.11-slim-buster

WORKDIR /app

ENV FLASK_APP=__init__.py \
    CLIENT_ID=${CLIENT_ID} \
    CLIENT_SECRET=${CLIENT_SECRET}

COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["sh", "-c", "python3 -m flask init-db && python3 -m flask run --host=0.0.0.0"]