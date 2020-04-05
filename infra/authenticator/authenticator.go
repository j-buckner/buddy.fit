package authenticator

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

// Authenticator represents an authenticator
type Authenticator struct {
	DB *sql.DB
}

// Credentials represents user credentials required to log in
type Credentials struct {
	Password string `json:"password"`
	Email    string `json:"email"`
}

// Login handles logging in users given credentials
func (auth Authenticator) Login(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	// Get the JSON body and decode into credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if creds.Email == "" || creds.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	email := strings.ToLower(creds.Email)

	var exists string
	err = auth.DB.QueryRow("select id from users where email = ?", 1).Scan(&email)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}
	fmt.Println(exists)
}

// Hashes the given plain-text password.
func hashPassword(pass string) (string, error) {
	passHash, err := bcrypt.GenerateFromPassword([]byte(pass), 0)
	if err != nil {
		return "", errors.New("hashed password cannot be an empty string")
	}
	return string(passHash), err
}
