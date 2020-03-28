package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/health", ping)
	http.HandleFunc("/headers", headers)
	http.ListenAndServe(":8090", nil)
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
