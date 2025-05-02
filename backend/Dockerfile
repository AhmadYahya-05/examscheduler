FROM eclipse-temurin:17-jdk as builder
WORKDIR /app
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# === Runtime stage ===
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /app/target/examscheduler-0.0.1-SNAPSHOT.jar .

# ✅ EXPOSE port 8080 so Railway can map traffic to your app
EXPOSE 8080

# ✅ Correct CMD to run your Spring Boot app
ENTRYPOINT ["java", "-jar", "examscheduler-0.0.1-SNAPSHOT.jar"]

