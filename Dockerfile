FROM openjdk:8-jdk-alpine

COPY target/coffee-order-frontend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
