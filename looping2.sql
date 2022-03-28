CREATE TABLE Stagiaire(
   id_stagiaire SMALLINT NOT NULL AUTO_INCREMENT,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   telephone VARCHAR(50),
   adresse VARCHAR(50),
   PRIMARY KEY(id_stagiaire)
);

CREATE TABLE lieu(
   id_lieu INT NOT NULL AUTO_INCREMENT,
   nom VARCHAR(50),
   adresse VARCHAR(50),
   lat REAL,
   lon REAL,
   PRIMARY KEY(id_lieu)
);

CREATE TABLE evennement(
   id_evenement INT,
   Nom VARCHAR(50),
   Jour DATETIME,
   id_lieu INT,
   id_stagiaire SMALLINT NOT NULL,
   PRIMARY KEY(id_evenement),
   FOREIGN KEY(id_lieu) REFERENCES lieu(id_lieu),
   FOREIGN KEY(id_stagiaire) REFERENCES Stagiaire(id_stagiaire)
);


CREATE TABLE invites_evennement( id_evenement INT, id_stagiaire SMALLINT, id_invite INT NOT NULL AUTO_INCREMENT, status SMALLINT, PRIMARY KEY(id_invite), FOREIGN KEY(id_evenement) REFERENCES Evennement(id_evenement), FOREIGN KEY(id_stagiaire) REFERENCES Stagiaire(id_stagiaire) );

CREATE TABLE Messages_contact(
   id_message INT NOT NULL AUTO_INCREMENT,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   telephone VARCHAR(50),
   mail VARCHAR(50),
   PRIMARY KEY(id_message)
);
