### Test task shipments app


##### To launch the application, enter the command:
    sudo docker-compose up

##### The application will be available at
http://localhost:3030


Application has two pages: **senders** and **shipments**. Addresses and a few senders will be created when the application starts. I did not implement the creation of addresses through the API, we will assume that the system receives them from an external API.

The application allows to create and edit senders, and perform all CRUD operations on the shipments.


##### To run tests:
1. Stop previous docker-compose.
2. Move to backend folder
    ```cd ./backend```
3. Start database in docker:
    ```sudo docker-compose up -d```
4. Run tests:
    ```./manage.py test```
