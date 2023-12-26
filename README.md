# BookShelf

# bookshelf-be

Installation Description

    Django
    Django Rest framework
    JWT

Django:

    python3 manage.py makemigrations;
    python3 manage.py migrate;
    python3 manage.py runserver;

# bookshelf-fe

    npm install 
    npm start


# Setup Database
    CREATE DATABASE bookapp;
    USE bookapp;
    CREATE USER 'dhara'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dhara123';
    GRANT ALL ON blog_data.* TO 'dhara'@'localhost';
    FLUSH PRIVILEGES;

