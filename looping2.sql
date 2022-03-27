CREATE TABLE Stagiaire(
   id_stagiare SMALLINT NOT NULL AUTO_INCREMENT,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   telephone VARCHAR(50),
   adresse VARCHAR(50),
   PRIMARY KEY(id_stagiare)
);

CREATE TABLE lieux(
   id_lieux INT NOT NULL AUTO_INCREMENT,
   nom VARCHAR(50),
   adresse VARCHAR(50),
   lat REAL,
   long REAL,
   PRIMARY KEY(id_lieux)
);

CREATE TABLE Evenement(
   id_evenement INT NOT NULL AUTO_INCREMENT,
   nom VARCHAR(50),
   id_lieux INT,
   id_stagiare SMALLINT NOT NULL,
   PRIMARY KEY(id_evenement),
   FOREIGN KEY(id_lieux) REFERENCES lieux(id_lieux),
   FOREIGN KEY(id_stagiare) REFERENCES Stagiaire(id_stagiare)
);

CREATE TABLE est_invité(
   id_evenement INT,
   id_stagiare SMALLINT,
   id_invite INT NOT NULL AUTO_INCREMENT,
   status BYTE,
   PRIMARY KEY(id_evenement, id_stagiare, id_invite),
   FOREIGN KEY(id_evenement) REFERENCES Evenement(id_evenement),
   FOREIGN KEY(id_stagiare) REFERENCES Stagiaire(id_stagiare)
);

CREATE TABLE Messages_contact(
   id_message INT NOT NULL AUTO_INCREMENT,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   telephone VARCHAR(50),
   mail VARCHAR(50),
   PRIMARY KEY(id_message)
);
