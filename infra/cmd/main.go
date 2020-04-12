package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/j-buckner/buddy.fit/infra/authenticator"
	"github.com/j-buckner/buddy.fit/infra/db"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	db, err := db.InitDB()
	if err != nil {
		log.Panic(err)
	}

	// Override for prod
	jwtKey := []byte("localJWTKey")
	auth := authenticator.Authenticator{
		DB:     db,
		JWTKey: jwtKey,
	}

	http.HandleFunc("/health", ping)
	http.HandleFunc("/login", auth.Login)

	http.ListenAndServe(fmt.Sprintf(":%v", port), nil)
}

func ping(w http.ResponseWriter, req *http.Request) {
	w.WriteHeader(200)
}
