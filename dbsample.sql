-- MovieUser Table
CREATE TABLE MovieUser (
    UserID INT PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    JoinDate DATE
);

-- UserList Table
CREATE TABLE UserList (
    ListID INT PRIMARY KEY,
    UserID INT,
    ListName VARCHAR(100) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES MovieUser(UserID) ON DELETE CASCADE
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
    ReviewDescription CLOB,
    PRIMARY KEY (UserID, MovieID),
    FOREIGN KEY (UserID) REFERENCES MovieUser(UserID) ON DELETE CASCADE,
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID) ON DELETE CASCADE
);

-- ListMovies Table
CREATE TABLE ListMovies (
    ListID INT,
    MovieID INT,
    PRIMARY KEY (ListID, MovieID),
    FOREIGN KEY (ListID) REFERENCES UserList(ListID) ON DELETE CASCADE,
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID) ON DELETE CASCADE
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
