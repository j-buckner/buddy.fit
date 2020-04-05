package authenticator

import (
	"encoding/json"
	"net/http"
)

// Credentials represents user credentials required to log in
type Credentials struct {
	Password string `json:"password"`
	Email    string `json:"email"`
}

// Signin handles logging in users given credentials
func Signin(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	// Get the JSON body and decode into credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// log.Info("Creds: ", creds)
	// fmt.Println("DB: ", db.db())
}
