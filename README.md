# 📌 Nom du projet

## 📝 Description

Application *Spring Boot* développée dans le cadre du *Hackathon INSI*, dédiée à la *jeunesse malgache*.
Elle expose une *API REST* permettant la gestion des événements destinés aux jeunes à Madagascar : formations, ateliers, conférences, activités culturelles et initiatives communautaires.

L'objectif du projet est de *faciliter l'accès à l'information*, de *renforcer l'engagement des jeunes* et de *promouvoir les opportunités éducatives et professionnelles* à travers le numérique.

---

## 🎯 Objectifs du projet

* Valoriser les initiatives dédiées à la *jeunesse à Madagascar*
* Centraliser les *événements et opportunités pour les jeunes*
* Encourager la *participation citoyenne et l'engagement communautaire*
* Fournir une *base backend fiable* pour des applications web et mobiles

---

## 🛠️ Stack technique

* Java 21
* Spring Boot
* Spring Web
* Spring Data JPA
* PostgreSQL
* Maven
* Lombok

---

## ✅ Prérequis

* Java 21
* Maven ou Maven Wrapper
* Git
* PostgreSQL

---

## ⚙️ Installation

### 1️⃣ Cloner le projet

git clone https://gitea.insi.local/logic_crew_team_10.git
cd projet

### 2️⃣ Configurer la base de données

Modifier le fichier application.properties ou application.yml :

properties
spring.datasource.url=jdbc:postgresql://localhost:5432/nom_base
spring.datasource.username=postgres
spring.datasource.password=motdepasse

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

### 3️⃣ Construire le projet

./mvnw clean package

### 4️⃣ Lancer l’application

./mvnw spring-boot:run

L’API sera accessible à l’adresse :

http://localhost:8080

---

## 🌐 Endpoints principaux (exemples)

| Méthode | Endpoint           | Description                          |
| ------- | ------------------ | ------------------------------------ |
| GET     | /api/events      | Liste des événements pour les jeunes |
| GET     | /api/events/{id} | Détails d’un événement               |
| POST    | /api/events      | Créer un événement jeunesse          |
| PUT     | /api/events/{id} | Modifier un événement                |
| DELETE  | /api/events/{id} | Supprimer un événement               |

---

## 🧪 Tests

./mvnw test

---

## 📦 Build

java -jar target/projet-0.0.1-SNAPSHOT.jar

---

## 🌍 Impact attendu

Ce projet vise à contribuer au *développement de la jeunesse malgache* en :

* améliorant la visibilité des *opportunités locales*
* soutenant l’**innovation et l’entrepreneuriat des jeunes**
* favorisant l’**inclusion numérique et l’accès à l’information**

---

## 👥 Contexte

Projet réalisé lors du *Hackathon INSI*, dans une démarche d’innovation sociale et numérique au service des *jeunes à Madagascar*.
gitea.insi.local