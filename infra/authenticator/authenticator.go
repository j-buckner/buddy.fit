package authenticator

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

// Authenaticator represents an authenticator
type Authenticator struct {
	DB *sql.DB
}

// Credentials represents user credentials required to log in
type Credentials struct {
	Password string `json:"password"`
	Email    string `json:"email"`
}

// Signin handles logging in users given credentials
func (auth Authenticator) Login(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	// Get the JSON body and decode into credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Println("Auth conn: ", auth.DB)
}
