# AmaKaren_Books

A web app that connects people who love books with other people who love books.

This was a school project. Amaka and Karen collaborated on it in June 2020.

There is no licence included.

June 18, 2020 - Final Report:

1. What the project does:

   a. This is a Node.js Express web app. It uses a MySql database, Handlebars templates, a Mapbox map, and the Geocoder.ca api.

   b. The home page introduces the visitor to the purpose of the site and prompts them to either log in or create an account.

   c. Once a visitor is logged in, their credentials are stored in session cookies. The menu is now also available.

   d.The account page allows a visitor to change the information they have stored in the database. A new visitor is prompted for this imformation as soon as they create an account. All of the fields are required, except for the phone number.

   e. The wishlist page makes a list from the database of the books that the current visitor has stored in the wishlist table. It also has a form that allows a visitor to add books to their wishlist. The page is reloaded with all new entries. It also has a map which, at the moment, shows the visitor's approximate location. This information is based on the postal code they have provided.

   f. The available books page lists the books a visitor has said they would like to lend to other users. There is a form where they can add more books to their list.

   g. The review page lists the reviews the visitor has given and includes a form for them to write more reviews. They can give the book a rating of 1-5, any number outside these bounds is changed to match the requirements of the database. For example, they enter 100, it will be stored as 5

   h. The messagge page allows visitors to send us a message that will be stored in the database.

   i. The header contains a logout link that brings the visitor back to the home page once the cookies are deleted.
   

2. Features Implemented

   a. user login with cookies
   
   b. a database that stores users, books available to lend, books in a user's wishlist, user's book reviews, and messages.  
   
   c. a map that shows the user's location
   
   d. a UI that is easy to navigate and understand
   

3. Unfinished Features

   a. email messaging
   
   b. the wishlist page does not show locations of the books in the wishlist
   
   c. the wishlist, available, and reviews pages do not allow users to alter or delete their previous entries
   

4. Features for the Future

   a. users should be able to see if another user has a book on their wishlist, is that book available, and where are they on the map
   
   b. users could have public profiles that other members can search. The profile could include their available books and what's on their wishlist.
   
   c. a book search to allow user's to look up all published books, for title, author, date published, etc.
   
   d. a search within the site for available books matching certain criteria
