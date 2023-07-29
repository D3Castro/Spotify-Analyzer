FROM python:3.11-alpine

WORKDIR /app

ENV FLASK_APP=__init__.py \
    CLIENT_ID=${CLIENT_ID} \
    CLIENT_SECRET=${CLIENT_SECRET}

COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]