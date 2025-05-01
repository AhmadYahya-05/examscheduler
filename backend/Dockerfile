# Use OpenJDK 17
FROM eclipse-temurin:17-jdk as builder

# Set working directory
WORKDIR /app

# Copy Maven wrapper and project files
COPY . .

# Give permissions (important if you're using mvnw)
RUN chmod +x mvnw

# Build the app
RUN ./mvnw clean package -DskipTests

# Start a new stage for the final image
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy jar from builder
COPY --from=builder /app/target/examscheduler-0.0.1-SNAPSHOT.jar .

# Expose port
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "/app/examscheduler-0.0.1-SNAPSHOT.jar"]
