package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/j-buckner/buddy.fit/infra/authenticator"
	"github.com/j-buckner/buddy.fit/infra/db"
	"github.com/j-buckner/buddy.fit/infra/food"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	dbConn, err := db.InitDB()
	if err != nil {
		log.Panic(err)
	}

	// Override for prod
	jwtKey := []byte("localJWTKey")
	auth := authenticator.Authenticator{
		DB:     dbConn,
		JWTKey: jwtKey,
	}

	food := food.Food{DB: dbConn}

	http.HandleFunc("/health", ping)
	http.HandleFunc("/login", auth.Login)
	http.HandleFunc("/signup", auth.Signup)
	http.HandleFunc("/search", food.Search)

	http.ListenAndServe(fmt.Sprintf(":%v", port), nil)
}

func ping(w http.ResponseWriter, req *http.Request) {
	w.WriteHeader(200)
}
