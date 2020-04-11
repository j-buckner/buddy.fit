package authenticator

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/j-buckner/buddy.fit/infra/db"
)

func TestLogin(t *testing.T) {
	db, err := db.InitDB()
	assert.NoError(t, err)

	auth := Authenticator{
		DB: db,
	}

	success := auth.handleLogin("buck@buck.com", "test")
	assert.True(t, success)
}
