FROM python:3.10

RUN apt update && apt upgrade -y
RUN apt install postgresql postgresql-contrib -y

WORKDIR /usr/src/app

RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app

RUN pip install -r requirements.txt

COPY . /usr/src/app

EXPOSE 8002

CMD python manage.py migrate && \
    python manage.py generate_senders -c=5 && \
    python manage.py generate_addresses -c=10 && \
    python manage.py runserver 0.0.0.0:8002
