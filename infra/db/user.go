package db

import (
	"database/sql"
	"errors"
	"fmt"
	"time"
)

// create table users (id integer primary key, email varchar(50) unique not null, password varchar(150) not null, nickname varchar(50), created_at timestamp not null);

// User represents a user
type User struct {
	Email    string
	Password string
	Nickname string
}

// Create creates a new User resource and inserts into the database
func (user User) Create(db *sql.DB) error {
	// Fields can't be empty
	if user.Email == "" || user.Password == "" || user.Nickname == "" {
		return errors.New("User fields can not be empty")
	}

	insert := `INSERT INTO users (email, password, nickname, created_at) VALUES ($1, $2, $3, $4)`
	_, err := db.Exec(insert, user.Email, user.Password, user.Nickname, time.Now())
	fmt.Println("Err?: ", err)
	if err != nil {
		return err
	}

	return nil
}

// Get gets a userID from the database
func (user User) Get(db *sql.DB) (int, error) {
	var idFound int
	fmt.Println("Checking: ", user.Email)
	err := db.QueryRow("select id from users where email = $1", user.Email).Scan(&idFound)
	if err != nil {
		return -1, err
	}

	return idFound, nil
}
