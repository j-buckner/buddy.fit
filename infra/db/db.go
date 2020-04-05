package db

import (
	"context"
	"fmt"
	"log"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	secretmanagerpb "google.golang.org/genproto/googleapis/cloud/secretmanager/v1"
)

// Credentials represents database connection credentials
type Credentials struct {
	User       string
	Pass       string
	Connection string
}

// DB returns a database connection
func DB() {
	fmt.Println("testing")
	creds := getDBCredentials()

	fmt.Println("Creds: ", creds)
}

func getDBCredentials() Credentials {
	// GCP project in which to store secrets in Secret Manager.
	projectID := "buddy.fit"

	// Create the client.
	ctx := context.Background()
	client, err := secretmanager.NewClient(ctx)
	if err != nil {
		log.Fatalf("failed to setup client: %v", err)
	}

	secretKey := "DB_USER"

	// Create the request to create the secret.
	getSecretReq := &secretmanagerpb.GetSecretRequest{
		Name: fmt.Sprintf("projects/%s/secrets/%s", projectID, secretKey),
	}

	secret, err := client.GetSecret(ctx, getSecretReq)
	if err != nil {
		log.Fatalf("failed to get secret: %v", err)
	}

	fmt.Println("Got secret: ", secret.Name)

	return Credentials{}
}
