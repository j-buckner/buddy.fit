package authenticator

import (
	"database/sql"
	"encoding/json"
	"errors"
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

	// Neither fields can be empty
	if creds.Email == "" || creds.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	email := strings.ToLower(creds.Email)
	pass := creds.Password

	var idFound int
	var passFound string
	err = auth.DB.QueryRow("select id, password from users where email = $1", email).Scan(&idFound, &passFound)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if idFound == 0 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if nil != bcrypt.CompareHashAndPassword([]byte(passFound), []byte(pass)) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

// Hashes the given plain-text password.
func hashPassword(pass string) (string, error) {
	passHash, err := bcrypt.GenerateFromPassword([]byte(pass), 0)
	if err != nil {
		return "", errors.New("hashed password cannot be an empty string")
	}
	return string(passHash), err
}
