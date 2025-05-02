# === Build Stage ===
FROM eclipse-temurin:17-jdk AS builder
WORKDIR /app
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# === Run Stage ===
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy built JAR from builder stage
COPY --from=builder /app/target/examscheduler-0.0.1-SNAPSHOT.jar app.jar

# Expose the port Spring Boot will run on
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]


