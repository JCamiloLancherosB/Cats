FROM nginx:latest

RUN mkdir -p /home/app

COPY . /home/app

EXPOSE 3010

CMD ["nginx", "/home/app/src/App.jsx"]