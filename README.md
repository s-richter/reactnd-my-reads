# MyReads: A Book Tracking App - Udacity React Nanodegree - Project 1

This app allows the user to manage books by searching for new books and adding them to book shelves.


## About

This is the first project for the Udacity React Nanodegree.
The app consists of two pages - the main page displaying the books in their shelves, and a search page.

On the main page, the user can move books between the following shelves (categories):
* currently reading
* want to read
* read - the books the user has already read
For moving the books between shelves, a menu control (drop down) next to the cover picture of each book is supplied.

On the search page the user can enter a search term and a list of matching books is being displayed while the user types. As on the main page, books have a menu control to move them between shelves. If a book is already on a shelf on the main page, this shelf is marked on the menu control.

The app uses a remote server to search for books. An animated loading indicator is displayed while fetching data form the server, and an animated notification is displayed on the search page whenever the user changes a books' shelf.


## Installing

1. run `git clone https://github.com/s-richter/reactnd-my-reads` to clone this repository
2. change the directory by typing `cd reactnd-my-reads`
3. run `npm install` to install
4. run `npm start` (or `yarn start`) to start the app
5. on your browser, navigate to http://localhost:3000/, if no browser window or tab was opened automatically


## Searching

The following search terms are supported:
```
'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
```


## Built With

* [React](https://facebook.github.io/react/) - the UI framework
* [React Router](https://reacttraining.com/react-router/) - routing for React


## Authors

* [template providers](https://github.com/udacity/reactnd-project-myreads-starter) - *Initial work* - by the Udacity React Nanodegree team
* Stephan Richter - React parts and animations


## Contributing

Due to the nature of this project (final assessment project for Udacity's React Fundamentals course), no contributions by others are possible.