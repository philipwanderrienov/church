package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strconv"

	_ "github.com/lib/pq"
)

type DBConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	DBName   string
	SSLMode  string
}

func NewDBConfig() *DBConfig {
	port := 5432
	if rawPort := os.Getenv("DB_PORT"); rawPort != "" {
		if parsedPort, err := strconv.Atoi(rawPort); err == nil {
			port = parsedPort
		}
	}

	return &DBConfig{
		Host:     getenvOrDefault("DB_HOST", "localhost"),
		Port:     port,
		User:     getenvOrDefault("DB_USER", "postgres"),
		Password: getenvOrDefault("DB_PASSWORD", "qwerty123"),
		DBName:   getenvOrDefault("DB_NAME", "church"),
		SSLMode:  getenvOrDefault("DB_SSLMODE", "disable"),
	}
}

func getenvOrDefault(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func (c *DBConfig) Connect() (*sql.DB, error) {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		c.Host, c.Port, c.User, c.Password, c.DBName, c.SSLMode)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	log.Println("Connected to PostgreSQL database")
	return db, nil
}
