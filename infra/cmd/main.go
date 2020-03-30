package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/health", ping)
	http.HandleFunc("/headers", headers)
	// http.HandleFunc("/signin", Signin)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.ListenAndServe(fmt.Sprintf(":%v", port), nil)
}

func ping(w http.ResponseWriter, req *http.Request) {
	w.WriteHeader(200)
}

func headers(w http.ResponseWriter, req *http.Request) {
	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
}
