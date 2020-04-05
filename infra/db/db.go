package db

import (
	"context"
	"fmt"

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
	creds, _ := accessSecretVersion("projects/buddyfit/secrets/DB_USER/versions/latest")

	fmt.Println("Creds: ", creds)
}

// accessSecretVersion accesses the payload for the given secret version if one
// exists. The version can be a version number as a string (e.g. "5") or an
// alias (e.g. "latest").
func accessSecretVersion(name string) ([]byte, error) {
	// name := "projects/my-project/secrets/my-secret/versions/5"
	// name := "projects/my-project/secrets/my-secret/versions/latest"

	// Create the client.
	ctx := context.Background()
	client, err := secretmanager.NewClient(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to create secretmanager client: %v", err)
	}

	// Build the request.
	req := &secretmanagerpb.AccessSecretVersionRequest{
		Name: name,
	}

	// Call the API.
	result, err := client.AccessSecretVersion(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("failed to access secret version: %v", err)
	}

	// WARNING: Do not print the secret in a production environment - this snippet
	// is showing how to access the secret material.
	return result.Payload.Data, nil
}

// func getDBCredentials() Credentials {
// 	// GCP project in which to store secrets in Secret Manager.
// 	projectID := "buddyfit"

// 	// Create the client.
// 	ctx := context.Background()
// 	client, err := secretmanager.NewClient(ctx)
// 	if err != nil {
// 		log.Fatalf("failed to setup client: %v", err)
// 	}

// 	secretKey := "DB_USER"

// 	// Create the request to create the secret.
// 	getSecretReq := &secretmanagerpb.AccessSecretVersionRequest{
// 		Name: fmt.Sprintf("projects/%s/secrets/%s/versions/latest", projectID, secretKey),
// 	}

// 	secret, err := client.GetSecret(ctx, getSecretVersionReq)
// 	if err != nil {
// 		log.Fatalf("failed to get secret: %v", err)
// 	}

// 	fmt.Println("Got secret: ", secret.Name)

// 	return Credentials{}
// }
