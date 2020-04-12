package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	_ "github.com/lib/pq" // postgres driver
	secretmanagerpb "google.golang.org/genproto/googleapis/cloud/secretmanager/v1"
)

// InitDB returns a database connection
func InitDB() (*sql.DB, error) {
	fmt.Println("Initing")
	if os.Getenv("env") != "prod" {
		var (
			host     = "localhost"
			user     = "postgres"
			password = ""
			dbname   = ""
		)
		port := 5432
		psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
			"password=%s dbname=%s sslmode=disable",
			host, port, user, password, dbname)

		db, err := sql.Open("postgres", psqlInfo)
		if err != nil {
			return nil, err
		}

		err = db.Ping()
		if err != nil {
			return nil, err
		}

		return db, nil
	}

	conn, err := accessSecretVersion("projects/buddyfit/secrets/INSTANCE_CONNECTION_NAME/versions/latest")
	if err != nil {
		return nil, err
	}

	user, err := accessSecretVersion("projects/buddyfit/secrets/DB_USER/versions/latest")
	if err != nil {
		return nil, err
	}

	pass, err := accessSecretVersion("projects/buddyfit/secrets/DB_PASS/versions/latest")
	if err != nil {
		return nil, err
	}

	db, err := initSocketConnectionPool(user, pass, conn)
	if err != nil {
		return nil, err
	}

	return db, nil
}

// accessSecretVersion accesses the payload for the given secret version if one
// exists. The version can be a version number as a string (e.g. "5") or an
// alias (e.g. "latest").
func accessSecretVersion(name string) (string, error) {
	// name := "projects/my-project/secrets/my-secret/versions/5"
	// name := "projects/my-project/secrets/my-secret/versions/latest"

	// Create the client.
	ctx := context.Background()
	client, err := secretmanager.NewClient(ctx)
	if err != nil {
		return "", fmt.Errorf("failed to create secretmanager client: %v", err)
	}

	// Build the request.
	req := &secretmanagerpb.AccessSecretVersionRequest{
		Name: name,
	}

	// Call the API.
	result, err := client.AccessSecretVersion(ctx, req)
	if err != nil {
		return "", fmt.Errorf("failed to access secret version: %v", err)
	}

	// WARNING: Do not print the secret in a production environment - this snippet
	// is showing how to access the secret material.
	return string(result.Payload.Data), nil
}

// initSocketConnectionPool initializes a Unix socket connection pool for
// a Cloud SQL instance of MySQL.
func initSocketConnectionPool(user string, pass string, conn string) (*sql.DB, error) {
	// [START cloud_sql_mysql_databasesql_create_socket]
	var (
		dbUser                 = user
		dbPwd                  = pass
		instanceConnectionName = conn
		dbName                 = ""
	)

	var dbURI string
	dbURI = fmt.Sprintf("%s:%s@unix(/cloudsql/%s)/%s", dbUser, dbPwd, instanceConnectionName, dbName)

	// dbPool is the pool of database connections.
	dbPool, err := sql.Open("postgres", dbURI)
	if err != nil {
		return nil, fmt.Errorf("sql.Open: %v", err)
	}

	// [START_EXCLUDE]
	configureConnectionPool(dbPool)
	// [END_EXCLUDE]

	return dbPool, nil
	// [END cloud_sql_mysql_databasesql_create_socket]
}

// configureConnectionPool sets database connection pool properties.
// For more information, see https://golang.org/pkg/database/sql
func configureConnectionPool(dbPool *sql.DB) {
	// [START cloud_sql_mysql_databasesql_limit]

	// Set maximum number of connections in idle connection pool.
	dbPool.SetMaxIdleConns(5)

	// Set maximum number of open connections to the database.
	dbPool.SetMaxOpenConns(7)

	// [END cloud_sql_mysql_databasesql_limit]

	// [START cloud_sql_mysql_databasesql_lifetime]

	// Set Maximum time (in seconds) that a connection can remain open.
	dbPool.SetConnMaxLifetime(1800)

	// [END cloud_sql_mysql_databasesql_lifetime]
}
