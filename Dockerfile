#FROM ubuntu:latest
#LABEL authors="DELL"
#
#ENTRYPOINT ["top", "-b"]
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/ajax-0.0.1-SNAPSHOT.jar ajax.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","ajax.jar"]
