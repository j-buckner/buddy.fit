package authenticator

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	db "github.com/j-buckner/buddy.fit/infra/db"
	"golang.org/x/crypto/bcrypt"
)

// Authenticator represents an authenticator
type Authenticator struct {
	DB     *sql.DB
	JWTKey []byte
}

// Credentials represents user credentials required to log in
type Credentials struct {
	Password string `json:"password"`
	Email    string `json:"email"`
}

// Claims represents a JWT claim issued after login
type Claims struct {
	Email string `json:"emal"`
	jwt.StandardClaims
}

// Login represents our authentication http endopint that handles logging in users given credentials in a request
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

	err = auth.handleLogin(email, pass)
	if err != nil {
		// For now assume all errors are client
		http.Error(w, "User or password is invalid", http.StatusBadRequest)
		return
	}

	tokenCookie, err := auth.issueToken(email)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &tokenCookie)
}

func (auth Authenticator) handleLogin(email string, pass string) error {
	var idFound int
	var passFound string
	err := auth.DB.QueryRow("select id, password from users where email = $1", email).Scan(&idFound, &passFound)
	if err != nil {
		return errors.New("User or password is invalid")
	}
	if idFound == 0 {
		return errors.New("User or password is invalid")
	}
	if nil != bcrypt.CompareHashAndPassword([]byte(passFound), []byte(pass)) {
		return errors.New("User or password is invalid")
	}

	return nil
}

// Signup represents our http endpoint to create a new user and log them in
func (auth Authenticator) Signup(w http.ResponseWriter, r *http.Request) {
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

	err = auth.handleSignup(email, pass)
	if err != nil {
		http.Error(w, "User or password is invalid, or email already exists", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (auth Authenticator) handleSignup(email string, password string) error {
	var idFound int
	auth.DB.QueryRow("select id from users where email = $1", email).Scan(&idFound)
	if idFound != 0 {
		return errors.New("User or password is invalid, or email already exists")
	}
	passHash, err := hashPassword(password)
	if err != nil {
		return errors.New("User or password is invalid, or email already exists")
	}
	user := db.User{
		Email:    email,
		Password: passHash,
		Nickname: email,
	}
	err = user.Create(auth.DB)
	if err != nil {
		return errors.New("User or password is invalid, or email already exists")
	}
	return nil
}

func (auth Authenticator) issueToken(email string) (http.Cookie, error) {
	expirationTime := time.Now().Add(5 * time.Minute)
	// Create the JWT claims, which includes the username and expiry time
	claims := &Claims{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	tokenString, err := token.SignedString(auth.JWTKey)
	if err != nil {
		return http.Cookie{}, errors.New("internal server error")
	}

	return http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	}, nil
}

// Hashes the given plain-text password.
func hashPassword(pass string) (string, error) {
	passHash, err := bcrypt.GenerateFromPassword([]byte(pass), 0)
	if err != nil {
		return "", errors.New("hashed password cannot be an empty string")
	}
	return string(passHash), err
}
