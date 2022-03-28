CREATE TABLE stagiaire(
   id_stagiaire SMALLINT NOT NULL AUTO_INCREMENT,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   telephone VARCHAR(50),
   adresse VARCHAR(50),
   PRIMARY KEY(id_stagiaire)
);

CREATE TABLE lieu(
   id_lieu SMALLINT NOT NULL AUTO_INCREMENT,
   nom VARCHAR(50),
   adresse VARCHAR(50),
   lat REAL,
   lon REAL,
   PRIMARY KEY(id_lieu)
);

CREATE TABLE vennement(
   id_evenement SMALLINT NOT NULL AUTO_INCREMENT,
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


INSERT INTO `stagiaire` (`id_stagiaire`, `nom`, `prenom`, `telephone`, `adresse`) VALUES (NULL, 'Mouton', 'Nicolas', '1234567890', 'LDNR Labege'),(NULL, 'Benslika', 'Dalila', '1234567890', 'LDNR Labege'), (NULL, 'Bah', 'Djibril', '1234567890', 'LDNR Labege'), (NULL, 'Hamadi', 'Mehdi', '1234567890', 'LDNR Labege'), (NULL, 'Buchner', 'Nina', '1234567890', 'LDNR Labege');

INSERT INTO `lieu` (`id_lieu`, `nom`, `adresse`) VALUES (NULL, 'Toulouse', 'rue du capitole'), (NULL, 'Albi', 'rue du developpement'), (NULL, 'Labege', 'rue du web'), (NULL, 'LDNR', 'rue de la reussite'), (NULL, 'Zenith', 'rue du stress');