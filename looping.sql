CREATE TABLE stagiaire(
   id_stagiaire SMALLINT,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   telephone VARCHAR(50),
   adresse VARCHAR(50),
   PRIMARY KEY(id_stagiaire)
);

CREATE TABLE lieu(
   id_lieu SMALLINT,
   nom VARCHAR(50),
   adresse VARCHAR(50),
   PRIMARY KEY(id_lieu)
);

CREATE TABLE Evennement(
   id_evenement SMALLINT,
   Nom VARCHAR(50),
   Jour DATETIME,
   id_lieu SMALLINT NOT NULL,
   id_stagiaire SMALLINT NOT NULL,
   PRIMARY KEY(id_evenement),
   FOREIGN KEY(id_lieu) REFERENCES lieu(id_lieu),
   FOREIGN KEY(id_stagiaire) REFERENCES stagiaire(id_stagiaire)
);

CREATE TABLE invites_evennement(
   id_stagiaire SMALLINT,
   id_evenement SMALLINT,
   PRIMARY KEY(id_stagiaire, id_evenement),
   FOREIGN KEY(id_stagiaire) REFERENCES stagiaire(id_stagiaire),
   FOREIGN KEY(id_evenement) REFERENCES Evennement(id_evenement)
);
