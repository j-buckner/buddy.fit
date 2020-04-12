package authenticator

import (
	"database/sql"
	"strconv"
	"testing"
	"time"

	db "github.com/j-buckner/buddy.fit/infra/db"
	infraDB "github.com/j-buckner/buddy.fit/infra/db"
	"github.com/stretchr/testify/assert"
)

func TestLogin(t *testing.T) {
	db := setup(t)

	auth := Authenticator{
		DB: db,
	}

	err := auth.handleLogin("buck@buck.com", "test")
	assert.NoError(t, err)
}

func TestSignup(t *testing.T) {
	db := setup(t)

	auth := Authenticator{
		DB: db,
	}

	user := infraDB.User{
		Email: "buck@buck.com" + strconv.FormatInt(time.Now().Unix(), 10),
	}

	err := auth.handleSignup(user.Email, "test")
	assert.NoError(t, err)

	userFound, err := user.Get(db)
	assert.NoError(t, err)
	assert.Greater(t, userFound, -1)
}

func setup(t *testing.T) *sql.DB {
	db, err := db.InitDB()
	assert.NoError(t, err)

	return db
}
