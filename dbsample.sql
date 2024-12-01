-- MovieUser Table
CREATE TABLE MovieUser (
    UserID INT PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    JoinDate DATE
);

-- UserList Table
CREATE TABLE USERLIST (
USERID NUMBER(38, 0),            -- Foreign key to MOVIEUSER table
LISTID NUMBER(38, 0),            -- Identifies the list (1, 2, 3 for each user)
LISTNAME VARCHAR2(100 BYTE),     -- Name of the list
PRIMARY KEY (USERID, LISTID),    -- Composite primary key
CONSTRAINT FK_LIST_USER FOREIGN KEY (USERID) REFERENCES MOVIEUSER(USERID)
);



CREATE TABLE Movie (
    MovieID INT PRIMARY KEY,
    Title VARCHAR2(255) NOT NULL,
    ReleaseDate DATE,
    Description VARCHAR2(4000),
    AverageRating DECIMAL(3, 2)
);


-- Reviews Table
CREATE TABLE Reviews (
    UserID INT,
    MovieID INT,
    UserRating INT CHECK (UserRating BETWEEN 1 AND 10),
    ReviewDescription VARCHAR2(4000),
    ReviewDate DATE,
    PRIMARY KEY (UserID, MovieID),
    FOREIGN KEY (UserID) REFERENCES MovieUser(UserID) ON DELETE CASCADE,
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID) ON DELETE CASCADE
);

-- ListMovies Table

CREATE TABLE ListMovies (
    UserID NUMBER(38, 0),
    ListID NUMBER(38, 0),
    MovieID NUMBER(38, 0),
    PRIMARY KEY (UserID, ListID, MovieID),  -- Composite primary key including UserID, ListID, and MovieID
    FOREIGN KEY (UserID, ListID) REFERENCES UserList(UserID, ListID) ON DELETE CASCADE,  -- Foreign key referencing composite key of UserList
    FOREIGN KEY (MovieID) REFERENCES Movie (MovieID)  -- Foreign key referencing Movie table (assuming Movie table exists)
);
-- Actor Table
CREATE TABLE Actor (
    ActorID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    BirthDate DATE
);
-- Director Table
CREATE TABLE Director (
    DirectorID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    BirthDate DATE
);
-- MovieActor Table
CREATE TABLE MovieActor (
    MovieID INT,
    ActorID INT,
    Role VARCHAR(100),
    PRIMARY KEY (MovieID, ActorID),
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID) ON DELETE CASCADE,
    FOREIGN KEY (ActorID) REFERENCES Actor(ActorID) ON DELETE CASCADE
);

-- MovieDirector Table
CREATE TABLE MovieDirector (
    MovieID INT,
    DirectorID INT,
    Role VARCHAR(100),
    PRIMARY KEY (MovieID, DirectorID),
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID) ON DELETE CASCADE,
    FOREIGN KEY (DirectorID) REFERENCES Director(DirectorID) ON DELETE CASCADE
);

-- Genre Table
CREATE TABLE Genre (
    GenreID INT PRIMARY KEY,
    GenreType VARCHAR(50) NOT NULL
);


-- MovieGenre Table
CREATE TABLE MovieGenre (
    GenreID INT,
    MovieID INT,
    PRIMARY KEY (GenreID, MovieID),
    FOREIGN KEY (GenreID) REFERENCES Genre(GenreID) ON DELETE CASCADE,
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID) ON DELETE CASCADE
);

CREATE OR REPLACE TRIGGER TRG_CREATE_USER_LISTS
AFTER INSERT ON MOVIEUSER
FOR EACH ROW
BEGIN
  -- Insert "Favorites" list with LISTID = 1
  INSERT INTO USERLIST (USERID, LISTID, LISTNAME)
  VALUES (:NEW.USERID, 1, 'Favorites');
  
  -- Insert "Watch Later" list with LISTID = 2
  INSERT INTO USERLIST (USERID, LISTID, LISTNAME)
  VALUES (:NEW.USERID, 2, 'Watch Later');
  
  -- Insert "Reviewed" list with LISTID = 3
  INSERT INTO USERLIST (USERID, LISTID, LISTNAME)
  VALUES (:NEW.USERID, 3, 'Reviewed');
END;
/


INSERT INTO Movie (MovieID, Title, ReleaseDate, Description) VALUES
(1, 'Inception', TO_DATE('2010-07-16', 'YYYY-MM-DD'), 'A mind-bending thriller about dreams within dreams.');

INSERT INTO Movie (MovieID, Title, ReleaseDate, Description) VALUES
(2, 'The Matrix', TO_DATE('1999-03-31', 'YYYY-MM-DD'), 'A hacker discovers the reality is a simulation controlled by machines.');

INSERT INTO Movie (MovieID, Title, ReleaseDate, Description) VALUES
(3, 'The Shawshank Redemption', TO_DATE('1994-10-14', 'YYYY-MM-DD'), 'The story of hope and friendship in a brutal prison.');

INSERT INTO Movie (MovieID, Title, ReleaseDate, Description) VALUES
(4, 'The Godfather', TO_DATE('1972-03-24', 'YYYY-MM-DD'), 'A chronicle of the powerful Italian-American crime family.');

INSERT INTO Movie (MovieID, Title, ReleaseDate, Description) VALUES
(5, 'Titanic', TO_DATE('1997-12-19', 'YYYY-MM-DD'), 'A tragic love story set on the ill-fated RMS Titanic.');

INSERT INTO Movie (MovieID, Title, ReleaseDate, Description) VALUES
(6, 'Avengers: Endgame', TO_DATE('2019-04-26', 'YYYY-MM-DD'), 'The Avengers assemble one last time to undo the damage caused by Thanos.');

INSERT INTO Movie (MovieID, Title, ReleaseDate, Description) VALUES
(7, 'Jurassic Park', TO_DATE('1993-06-11', 'YYYY-MM-DD'), 'Dinosaurs are brought back to life, leading to chaos on an island.');

INSERT INTO Movie (MovieID, Title, ReleaseDate, Description) VALUES
(8, 'The Dark Knight', TO_DATE('2008-07-18', 'YYYY-MM-DD'), 'Batman faces the Joker in a battle for Gotham’s soul.');

INSERT INTO Movie (MovieID, Title, ReleaseDate, Description) VALUES
(9, 'Forrest Gump', TO_DATE('1994-07-06', 'YYYY-MM-DD'), 'The extraordinary life journey of a simple man with a big heart.');

INSERT INTO Movie (MovieID, Title, ReleaseDate, Description) VALUES
(10, 'Pulp Fiction', TO_DATE('1994-10-14', 'YYYY-MM-DD'), 'Interwoven stories of crime, love, and redemption in Los Angeles.');



COMMIT;

INSERT INTO Genre (GenreID, GenreType) VALUES (1, 'Sci-Fi');
INSERT INTO Genre (GenreID, GenreType) VALUES (2, 'Drama');
INSERT INTO Genre (GenreID, GenreType) VALUES (3, 'Action');
INSERT INTO Genre (GenreID, GenreType) VALUES (4, 'Adventure');
INSERT INTO Genre (GenreID, GenreType) VALUES (5, 'Romance');
INSERT INTO Genre (GenreID, GenreType) VALUES (6, 'Crime');
INSERT INTO Genre (GenreID, GenreType) VALUES (7, 'Thriller');
INSERT INTO Genre (GenreID, GenreType) VALUES (8, 'Fantasy');
INSERT INTO Genre (GenreID, GenreType) VALUES (9, 'Comedy');
INSERT INTO Genre (GenreID, GenreType) VALUES (10, 'Horror');

COMMIT;

-- Inception (Sci-Fi, Thriller)
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (1, 1); -- Sci-Fi
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (1, 7); -- Thriller

-- The Matrix (Sci-Fi, Action)
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (2, 1); -- Sci-Fi
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (2, 3); -- Action

-- The Shawshank Redemption (Drama)
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (3, 2); -- Drama

-- The Godfather (Crime, Drama)
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (4, 6); -- Crime
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (4, 2); -- Drama

-- Titanic (Romance, Drama)
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (5, 5); -- Romance
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (5, 2); -- Drama

-- Avengers: Endgame (Action, Sci-Fi, Adventure)
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (6, 3); -- Action
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (6, 1); -- Sci-Fi
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (6, 4); -- Adventure

-- Jurassic Park (Adventure, Sci-Fi)
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (7, 4); -- Adventure
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (7, 1); -- Sci-Fi

-- The Dark Knight (Action, Crime, Thriller)
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (8, 3); -- Action
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (8, 6); -- Crime
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (8, 7); -- Thriller

-- Forrest Gump (Drama, Romance)
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (9, 2); -- Drama
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (9, 5); -- Romance

-- Pulp Fiction (Crime, Drama)
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (10, 6); -- Crime
INSERT INTO MovieGenre (MovieID, GenreID) VALUES (10, 2); -- Drama

COMMIT;

UPDATE Movie 
SET AverageRating = 4.5
WHERE MovieID = 1;  -- Inception

UPDATE Movie 
SET AverageRating = 3.8
WHERE MovieID = 2;  -- The Matrix

UPDATE Movie 
SET AverageRating = 4.2
WHERE MovieID = 3;  -- The Shawshank Redemption

UPDATE Movie 
SET AverageRating = 4.0
WHERE MovieID = 4;  -- The Godfather

UPDATE Movie 
SET AverageRating = 3.6
WHERE MovieID = 5;  -- Titanic

UPDATE Movie 
SET AverageRating = 4.3
WHERE MovieID = 6;  -- Avengers: Endgame

UPDATE Movie 
SET AverageRating = 3.9
WHERE MovieID = 7;  -- Jurassic Park

UPDATE Movie 
SET AverageRating = 4.1
WHERE MovieID = 8;  -- The Dark Knight

UPDATE Movie 
SET AverageRating = 3.7
WHERE MovieID = 9;  -- Forrest Gump

UPDATE Movie 
SET AverageRating = 4.4
WHERE MovieID = 10;  -- Pulp Fiction

COMMIT;

-- Insert statement for user 1
INSERT INTO MovieUser (UserID, UserName, Email, Password, JoinDate) 
VALUES (1, 'JohnDoe', 'johndoe@example.com', 'password123', TO_DATE('2022-01-15', 'YYYY-MM-DD'));

-- Insert statement for user 2
INSERT INTO MovieUser (UserID, UserName, Email, Password, JoinDate) 
VALUES (2, 'JaneSmith', 'janesmith@example.com', 'mypassword', TO_DATE('2021-08-10', 'YYYY-MM-DD'));

-- Insert statement for user 3
INSERT INTO MovieUser (UserID, UserName, Email, Password, JoinDate) 
VALUES (3, 'MikeJohnson', 'mikejohnson@example.com', 'securepass', TO_DATE('2023-05-22', 'YYYY-MM-DD'));

-- Insert statement for user 4
INSERT INTO MovieUser (UserID, UserName, Email, Password, JoinDate) 
VALUES (4, 'EmilyDavis', 'emilydavis@example.com', '1234password', TO_DATE('2020-11-05', 'YYYY-MM-DD'));

-- Insert statement for user 5
INSERT INTO MovieUser (UserID, UserName, Email, Password, JoinDate) 
VALUES (5, 'ChrisBrown', 'chrisbrown@example.com', 'chris2020', TO_DATE('2019-07-15', 'YYYY-MM-DD'));

-- Insert statement for user 6
INSERT INTO MovieUser (UserID, UserName, Email, Password, JoinDate) 
VALUES (6, 'OliviaMartinez', 'oliviamartinez@example.com', 'password567', TO_DATE('2021-03-10', 'YYYY-MM-DD'));

-- Insert statement for user 7
INSERT INTO MovieUser (UserID, UserName, Email, Password, JoinDate) 
VALUES (7, 'DavidWilson', 'davidwilson@example.com', 'davidsmith', TO_DATE('2022-09-30', 'YYYY-MM-DD'));

-- Insert statement for user 8
INSERT INTO MovieUser (UserID, UserName, Email, Password, JoinDate) 
VALUES (8, 'SophiaGarcia', 'sophiagarcia@example.com', 'sophia2020', TO_DATE('2018-12-25', 'YYYY-MM-DD'));

-- Insert statement for user 9
INSERT INTO MovieUser (UserID, UserName, Email, Password, JoinDate) 
VALUES (9, 'LiamMartinez', 'liammartinez@example.com', 'liam2022', TO_DATE('2020-06-17', 'YYYY-MM-DD'));

-- Insert statement for user 10
INSERT INTO MovieUser (UserID, UserName, Email, Password, JoinDate) 
VALUES (10, 'AvaRodriguez', 'avarodriguez@example.com', 'avapassword', TO_DATE('2017-11-04', 'YYYY-MM-DD'));

COMMIT;

-- Insert actors
INSERT INTO Actor (ActorID, Name, BirthDate) VALUES (1, 'Leonardo DiCaprio', TO_DATE('1974-11-11', 'YYYY-MM-DD'));  -- Inception
INSERT INTO Actor (ActorID, Name, BirthDate) VALUES (2, 'Keanu Reeves', TO_DATE('1964-09-02', 'YYYY-MM-DD'));     -- The Matrix
INSERT INTO Actor (ActorID, Name, BirthDate) VALUES (3, 'Morgan Freeman', TO_DATE('1937-06-01', 'YYYY-MM-DD'));    -- The Shawshank Redemption
INSERT INTO Actor (ActorID, Name, BirthDate) VALUES (4, 'Marlon Brando', TO_DATE('1924-04-03', 'YYYY-MM-DD'));     -- The Godfather
INSERT INTO Actor (ActorID, Name, BirthDate) VALUES (5, 'Kate Winslet', TO_DATE('1975-10-05', 'YYYY-MM-DD'));      -- Titanic
INSERT INTO Actor (ActorID, Name, BirthDate) VALUES (6, 'Robert Downey Jr.', TO_DATE('1965-04-04', 'YYYY-MM-DD'));  -- Avengers: Endgame
INSERT INTO Actor (ActorID, Name, BirthDate) VALUES (7, 'Sam Neill', TO_DATE('1947-09-14', 'YYYY-MM-DD'));         -- Jurassic Park
INSERT INTO Actor (ActorID, Name, BirthDate) VALUES (8, 'Christian Bale', TO_DATE('1974-01-30', 'YYYY-MM-DD'));    -- The Dark Knight
INSERT INTO Actor (ActorID, Name, BirthDate) VALUES (9, 'Tom Hanks', TO_DATE('1956-07-09', 'YYYY-MM-DD'));         -- Forrest Gump
INSERT INTO Actor (ActorID, Name, BirthDate) VALUES (10, 'John Travolta', TO_DATE('1954-02-18', 'YYYY-MM-DD'));    -- Pulp Fiction

-- Insert directors
INSERT INTO Director (DirectorID, Name, BirthDate) VALUES (1, 'Christopher Nolan', TO_DATE('1970-07-30', 'YYYY-MM-DD'));  -- Inception
INSERT INTO Director (DirectorID, Name, BirthDate) VALUES (2, 'The Wachowskis', TO_DATE('1965-12-29', 'YYYY-MM-DD'));    -- The Matrix
INSERT INTO Director (DirectorID, Name, BirthDate) VALUES (3, 'Frank Darabont', TO_DATE('1959-01-28', 'YYYY-MM-DD'));    -- The Shawshank Redemption
INSERT INTO Director (DirectorID, Name, BirthDate) VALUES (4, 'Francis Ford Coppola', TO_DATE('1939-04-07', 'YYYY-MM-DD'));  -- The Godfather
INSERT INTO Director (DirectorID, Name, BirthDate) VALUES (5, 'James Cameron', TO_DATE('1954-08-16', 'YYYY-MM-DD'));    -- Titanic
INSERT INTO Director (DirectorID, Name, BirthDate) VALUES (6, 'Anthony and Joe Russo', TO_DATE('1970-02-03', 'YYYY-MM-DD'));  -- Avengers: Endgame
INSERT INTO Director (DirectorID, Name, BirthDate) VALUES (7, 'Steven Spielberg', TO_DATE('1946-12-18', 'YYYY-MM-DD'));  -- Jurassic Park
INSERT INTO Director (DirectorID, Name, BirthDate) VALUES (8, 'Christopher Nolan', TO_DATE('1970-07-30', 'YYYY-MM-DD'));  -- The Dark Knight
INSERT INTO Director (DirectorID, Name, BirthDate) VALUES (9, 'Robert Zemeckis', TO_DATE('1952-05-14', 'YYYY-MM-DD'));  -- Forrest Gump
INSERT INTO Director (DirectorID, Name, BirthDate) VALUES (10, 'Quentin Tarantino', TO_DATE('1963-03-27', 'YYYY-MM-DD'));  -- Pulp Fiction

-- Insert actors into the MovieActor table
INSERT INTO MovieActor (MovieID, ActorID, Role) VALUES (1, 1, 'Dom Cobb');           -- Inception
INSERT INTO MovieActor (MovieID, ActorID, Role) VALUES (2, 2, 'Neo');               -- The Matrix
INSERT INTO MovieActor (MovieID, ActorID, Role) VALUES (3, 3, 'Ellis Boyd Redding'); -- The Shawshank Redemption
INSERT INTO MovieActor (MovieID, ActorID, Role) VALUES (4, 4, 'Vito Corleone');      -- The Godfather
INSERT INTO MovieActor (MovieID, ActorID, Role) VALUES (5, 5, 'Rose DeWitt Bukater'); -- Titanic
INSERT INTO MovieActor (MovieID, ActorID, Role) VALUES (6, 6, 'Tony Stark');          -- Avengers: Endgame
INSERT INTO MovieActor (MovieID, ActorID, Role) VALUES (7, 7, 'Dr. Alan Grant');      -- Jurassic Park
INSERT INTO MovieActor (MovieID, ActorID, Role) VALUES (8, 8, 'Bruce Wayne / Batman'); -- The Dark Knight
INSERT INTO MovieActor (MovieID, ActorID, Role) VALUES (9, 9, 'Forrest Gump');         -- Forrest Gump
INSERT INTO MovieActor (MovieID, ActorID, Role) VALUES (10, 10, 'Vincent Vega');      -- Pulp Fiction

-- Insert directors into the MovieDirector table
INSERT INTO MovieDirector (MovieID, DirectorID, Role) VALUES (1, 1, 'Director');  -- Inception
INSERT INTO MovieDirector (MovieID, DirectorID, Role) VALUES (2, 2, 'Director');  -- The Matrix
INSERT INTO MovieDirector (MovieID, DirectorID, Role) VALUES (3, 3, 'Director');  -- The Shawshank Redemption
INSERT INTO MovieDirector (MovieID, DirectorID, Role) VALUES (4, 4, 'Director');  -- The Godfather
INSERT INTO MovieDirector (MovieID, DirectorID, Role) VALUES (5, 5, 'Director');  -- Titanic
INSERT INTO MovieDirector (MovieID, DirectorID, Role) VALUES (6, 6, 'Directors');  -- Avengers: Endgame
INSERT INTO MovieDirector (MovieID, DirectorID, Role) VALUES (7, 7, 'Director');  -- Jurassic Park
INSERT INTO MovieDirector (MovieID, DirectorID, Role) VALUES (8, 8, 'Director');  -- The Dark Knight
INSERT INTO MovieDirector (MovieID, DirectorID, Role) VALUES (9, 9, 'Director');  -- Forrest Gump
INSERT INTO MovieDirector (MovieID, DirectorID, Role) VALUES (10, 10, 'Director');  -- Pulp Fiction

COMMIT;